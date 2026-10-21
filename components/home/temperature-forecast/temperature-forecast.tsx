import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { formatSiteShort } from "@/lib/datetime";
import { ForecastChart } from "./forecast-chart";
import { TemperatureForecast, toChartPoints } from "./types";
import { apiFetch } from "@/lib/api";

const SOURCE_LABELS: Record<string, string> = {
  timestral: "Timestral",
  timestral_nws: "Timestral + NWS",
};

// TemperatureForecastContainer shows the latest 24h station temperature
// forecast with its uncertainty band, the NWS forecast and recent observations.
export default async function TemperatureForecastContainer() {
  const f = await apiFetch<TemperatureForecast>(
    "/api/v1/temperature_forecast/latest"
  );

  if (!f) {
    return (
      <Container isAlert>
        <Title title="station forecast" />
        <p className="text-destructive text-sm">station forecast unavailable</p>
      </Container>
    );
  }

  const source = SOURCE_LABELS[f.source] ?? f.source;

  return (
    <Container>
      <Title title="station forecast" />
      <p className="text-xs text-muted-foreground mb-4">
        next 24h at the station · {source} · issued {formatSiteShort(f.issued_at)}
      </p>
      <ForecastChart data={toChartPoints(f)} />
    </Container>
  );
}
