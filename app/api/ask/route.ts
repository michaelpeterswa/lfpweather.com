// Route handler for the AskBar. It proxies a chat request to the in-cluster
// broker and streams the broker's Server-Sent Events straight back to the
// browser. The broker URL (and optional token) stay server-side; the browser
// never sees them.

import { context, propagation, trace } from "@opentelemetry/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const tracer = trace.getTracer("lfpweather-frontend");

export async function POST(req: Request): Promise<Response> {
  // Span this request and inject its context into the broker call, so the whole
  // browser -> broker -> agent -> mcp -> api path is one trace. A no-op when
  // OpenTelemetry is not configured (no global provider registered).
  return tracer.startActiveSpan("POST /api/ask", async (span) => {
    try {
      const brokerURL = process.env.BROKER_URL;
      if (!brokerURL) {
        return new Response("the assistant is not configured", { status: 503 });
      }

      const body = await req.text();

      const headers: Record<string, string> = {
        "content-type": "application/json",
      };
      // W3C traceparent, so the broker continues this trace rather than starting
      // its own.
      propagation.inject(context.active(), headers);
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
    } finally {
      span.end();
    }
  });
}
