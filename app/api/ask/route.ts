// Route handler for the AskBar. It proxies a chat request to the in-cluster
// broker and streams the broker's Server-Sent Events straight back to the
// browser. The broker URL (and optional token) stay server-side; the browser
// never sees them.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  const brokerURL = process.env.BROKER_URL;
  if (!brokerURL) {
    return new Response("the assistant is not configured", { status: 503 });
  }

  const body = await req.text();

  const headers: Record<string, string> = { "content-type": "application/json" };
  if (process.env.BROKER_TOKEN) {
    headers["authorization"] = `Bearer ${process.env.BROKER_TOKEN}`;
  }
  // Forward the client IP so the broker's per-IP rate limiting sees the real
  // caller rather than this server.
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    headers["x-forwarded-for"] = xff;
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${brokerURL.replace(/\/$/, "")}/v1/chat`, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    });
  } catch {
    return new Response("the assistant is unavailable", { status: 502 });
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
    },
  });
}
