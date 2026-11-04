import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiFetch } from "@/lib/api";

// apiFetch's whole contract is "a failure of any kind comes back as null". A
// thrown fetch in a server component has nowhere to land except app/error.tsx,
// so one bad endpoint used to take the page with it. These tests are the
// guard rail for that: every shape of failure, plus what the request looks like
// on the wire when it succeeds.
type Call = { url: string; init: RequestInit };

function stubFetch(handler: (url: string, init: RequestInit) => Response) {
  const calls: Call[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: RequestInfo | URL, init: RequestInit = {}) => {
      calls.push({ url: String(url), init });
      return handler(String(url), init);
    })
  );
  return { calls, fetchMock: vi.mocked(globalThis.fetch) };
}

const ok = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

const savedEnv: Record<string, string | undefined> = {};

beforeEach(() => {
  for (const key of [
    "API_BASE_URL",
    "FORECAST_INFERENCE_API_BASE_URL",
    "API_KEY",
  ]) {
    savedEnv[key] = process.env[key];
    process.env[key] =
      key === "API_KEY" ? "test-key" : `https://${key.toLowerCase()}.test`;
  }
});

afterEach(() => {
  vi.unstubAllGlobals();
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("building the request", () => {
  it("prefixes a relative path with the api base and sends the key", async () => {
    const { calls } = stubFetch(() => ok({ value: 1 }));
    expect(await apiFetch("/api/v1/temperature/last")).toEqual({ value: 1 });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe("https://api_base_url.test/api/v1/temperature/last");
    const headers = calls[0].init.headers as Record<string, string>;
    expect(headers["X-API-Key"]).toBe("test-key");
    expect(calls[0].init.method).toBe("GET");
  });

  it("routes to the forecast base when asked", async () => {
    const { calls } = stubFetch(() => ok([]));
    await apiFetch("/api/v1/forecast", { base: "forecast" });
    expect(calls[0].url).toBe(
      "https://forecast_inference_api_base_url.test/api/v1/forecast"
    );
  });

  it("leaves an absolute URL alone and sends no key to it", async () => {
    const { calls } = stubFetch(() => ok({}));
    await apiFetch("https://api.nws.example/v1/forecast");
    const headers = calls[0].init.headers as Record<string, string>;
    expect(calls[0].url).toBe("https://api.nws.example/v1/forecast");
    expect(headers["X-API-Key"]).toBeUndefined();
  });

  it("posts a body when one is given and keeps it out of GETs", async () => {
    const { calls } = stubFetch(() => ok({}));
    await apiFetch("/api/v1/query", { body: { metric: "temperature" } });
    expect(calls[0].init.method).toBe("POST");
    expect(calls[0].init.body).toBe(JSON.stringify({ metric: "temperature" }));

    await apiFetch("/api/v1/temperature/last");
    expect(calls[1].init.method).toBe("GET");
    expect(calls[1].init.body).toBeUndefined();
  });

  it("can suppress auth on a relative path", async () => {
    const { calls } = stubFetch(() => ok({}));
    await apiFetch("/api/v1/public", { auth: false });
    const headers = calls[0].init.headers as Record<string, string>;
    expect(headers["X-API-Key"]).toBeUndefined();
  });
});

describe("caching", () => {
  it("revalidates a successful GET on the default window", async () => {
    const { calls } = stubFetch(() => ok({}));
    await apiFetch("/api/v1/temperature/last");
    expect(
      (calls[0].init as { next?: { revalidate: number } }).next
    ).toEqual({ revalidate: 60 });
  });

  it("honours a shorter window and opts out with false", async () => {
    const { calls } = stubFetch(() => ok({}));
    await apiFetch("/api/v1/alerts", { revalidate: 300 });
    expect(
      (calls[0].init as { next?: { revalidate: number } }).next
    ).toEqual({ revalidate: 300 });

    await apiFetch("/api/v1/live", { revalidate: false });
    expect(calls[1].init.cache).toBe("no-store");
    expect((calls[1].init as { next?: unknown }).next).toBeUndefined();
  });
});

describe("failures come back as null", () => {
  it("returns null on a non-200 and says which one", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { calls } = stubFetch(() => new Response("not found", { status: 404 }));
    await expect(apiFetch("/api/v1/nope")).resolves.toBeNull();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("404"));
    expect(calls).toHaveLength(1);
  });

  it("returns null when the connection fails", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    stubFetch(() => {
      throw new Error("ECONNRESET");
    });
    await expect(apiFetch("/api/v1/temperature/last")).resolves.toBeNull();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("ECONNRESET"));
  });

  it("returns null when the body is not JSON", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    stubFetch(() => new Response("<html>bad gateway</html>", { status: 200 }));
    await expect(apiFetch("/api/v1/temperature/last")).resolves.toBeNull();
    expect(warn).toHaveBeenCalledOnce();
  });

  it("abandons a hung upstream after the timeout", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    // Never settles; the request is rejected when AbortSignal.timeout fires,
    // which is how a hung upstream looks to undici.
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_url: RequestInfo | URL, init: RequestInit = {}) =>
          new Promise<never>((_resolve, reject) => {
            (init.signal as AbortSignal).addEventListener("abort", () =>
              reject(new Error("The operation was aborted."))
            );
          })
      )
    );
    await expect(
      apiFetch("/api/v1/slow", { timeoutMs: 10 })
    ).resolves.toBeNull();
    expect(warn).toHaveBeenCalledOnce();
  });
});

describe("a JSON null body", () => {
  it("stays null by default", async () => {
    stubFetch(() => ok(null));
    await expect(apiFetch("/api/v1/species")).resolves.toBeNull();
  });

  it("becomes nullBody, because Go encodes an empty slice as null", async () => {
    stubFetch(() => ok(null));
    await expect(
      apiFetch<string[]>("/api/v1/species", { nullBody: [] })
    ).resolves.toEqual([]);
  });

  it("does not replace a real body", async () => {
    stubFetch(() => ok(["Cascades"]));
    await expect(
      apiFetch<string[]>("/api/v1/species", { nullBody: [] })
    ).resolves.toEqual(["Cascades"]);
  });
});
