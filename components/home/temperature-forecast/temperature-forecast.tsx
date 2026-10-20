import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { formatSiteShort } from "@/lib/datetime";
import { ForecastChart } from "./forecast-chart";
import { TemperatureForecast, toChartPoints } from "./types";

const SOURCE_LABELS: Record<string, string> = {
  timestral: "Timestral",
  timestral_nws: "Timestral + NWS",
};

// TemperatureForecastContainer shows the latest 24h station temperature
// forecast with its uncertainty band, the NWS forecast and recent observations.
export default async function TemperatureForecastContainer() {
  // A dropped connection makes fetch throw; treat it like any failed response
  // so the card shows its error state.
  const res = await fetch(
    `${process.env.API_BASE_URL ?? ""}/api/v1/temperature_forecast/latest`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY ?? "",
      },
    }
  ).catch(() => null);

  if (res === null || res.status !== 200) {
    return (
      <Container isAlert>
        <Title title="station forecast" />
        <p className="text-destructive text-sm">station forecast unavailable</p>
      </Container>
    );
  }

  const f = (await res.json()) as TemperatureForecast;
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
