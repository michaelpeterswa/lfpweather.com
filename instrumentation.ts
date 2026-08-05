// Minimal OpenTelemetry setup for the frontend. We deliberately do NOT use
// @vercel/otel or any auto-instrumentation: its global fetch patch corrupts the
// Server Components' `await res.json()` calls (JSON EOF -> every page 500s).
//
// Instead this registers only a tracer provider + OTLP exporter and the W3C
// propagator. The one span we care about -- the /api/ask route continuing the
// browser request into the broker trace -- is created by hand in that route,
// where we inject `traceparent` into the broker fetch ourselves. The SSR data
// fetches are left completely untouched.
export async function register() {
  // Node runtime only (skip Edge), and a no-op when no collector is configured.
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (!process.env.OTEL_EXPORTER_OTLP_ENDPOINT) return;

  const { NodeTracerProvider, BatchSpanProcessor } = await import(
    "@opentelemetry/sdk-trace-node"
  );
  const { OTLPTraceExporter } = await import(
    "@opentelemetry/exporter-trace-otlp-http"
  );
  const { resourceFromAttributes } = await import("@opentelemetry/resources");
  const { ATTR_SERVICE_NAME } = await import(
    "@opentelemetry/semantic-conventions"
  );
  const { propagation } = await import("@opentelemetry/api");
  const { W3CTraceContextPropagator } = await import("@opentelemetry/core");

  const provider = new NodeTracerProvider({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: "lfpweather-frontend",
    }),
    spanProcessors: [new BatchSpanProcessor(new OTLPTraceExporter())],
  });

  provider.register();
  propagation.setGlobalPropagator(new W3CTraceContextPropagator());
}
