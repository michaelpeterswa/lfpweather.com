import { registerOTel } from "@vercel/otel";

// Next.js calls register() once on server start. @vercel/otel wires an OTLP
// trace exporter from OTEL_EXPORTER_OTLP_ENDPOINT and auto-instruments fetch, so
// the /api/ask route's call to the broker carries a traceparent. That makes the
// browser request the root of the broker -> agent -> mcp -> api trace. With no
// endpoint set (local dev), it is a no-op.
export function register() {
  registerOTel({ serviceName: "lfpweather-frontend" });
}
