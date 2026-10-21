/**
 * Shared fetch helper for server components.
 *
 * Every backend call on the site goes through apiFetch so that a failure of
 * any kind -- a non-200, a dropped connection (ECONNRESET), a hung upstream,
 * or a body that is not JSON -- comes back as null instead of throwing. A
 * thrown fetch in a server component has no error boundary to land in short
 * of app/error.tsx, so one bad endpoint used to take down the whole page.
 *
 * Successful GET responses are kept in Next's data cache for `revalidate`
 * seconds, so a page view does not fan out ~45 requests to the backend.
 * Relative-time labels ("3 minutes ago") are computed at render, not cached,
 * so they stay correct for cached data.
 */

/** Which backend a path belongs to. */
export type ApiBase = "api" | "forecast";

const BASES: Record<ApiBase, () => string> = {
  api: () => process.env.API_BASE_URL ?? "",
  forecast: () => process.env.FORECAST_INFERENCE_API_BASE_URL ?? "",
};

/** Default seconds a successful response stays cached. */
export const DEFAULT_REVALIDATE = 60;

/** Default milliseconds before a request is abandoned. */
const DEFAULT_TIMEOUT_MS = 10_000;

export type ApiFetchOptions<T> = {
  /** Backend to prefix `path` with. Ignored when `path` is an absolute URL. */
  base?: ApiBase;
  /** JSON request body; makes the request a POST. */
  body?: unknown;
  /** Seconds to cache a successful response, or false to never cache. */
  revalidate?: number | false;
  /** Milliseconds before the request is abandoned. */
  timeoutMs?: number;
  /** Send the backend API key. Defaults to true for relative paths. */
  auth?: boolean;
  /**
   * Value to return for a JSON `null` body, which would otherwise be
   * indistinguishable from a failure. Go encodes an empty slice as null, so
   * list endpoints pass [] here.
   */
  nullBody?: T;
};

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions<T> = {}
): Promise<T | null> {
  const {
    base = "api",
    body,
    revalidate = DEFAULT_REVALIDATE,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = options;

  const absolute = /^https?:\/\//.test(path);
  const url = absolute ? path : `${BASES[base]()}${path}`;
  const auth = options.auth ?? !absolute;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (auth) {
    headers["X-API-Key"] = process.env.API_KEY ?? "";
  }

  try {
    const res = await fetch(url, {
      method: body === undefined ? "GET" : "POST",
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
      ...(revalidate === false
        ? { cache: "no-store" as const }
        : { next: { revalidate } }),
    });
    if (res.status !== 200) {
      console.warn(`[api] ${url} returned ${res.status}`);
      return null;
    }
    const data = (await res.json()) as T | null;
    return data ?? options.nullBody ?? null;
  } catch (err) {
    console.warn(`[api] ${url} failed: ${(err as Error).message}`);
    return null;
  }
}
