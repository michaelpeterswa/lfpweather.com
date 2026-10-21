import { Separator } from "@/components/ui/separator";
import Container from "../../layout/container/container";
import Title from "../../layout/container/title";
import { DetailedForecastResponse } from "@/components/home/forecast/types";
import WeatherIcon from "@/components/weather/icons";
import { apiFetch } from "@/lib/api";
import { SectionError } from "@/components/layout/error-state";

export default async function ForecastContainer() {
  const forecast = await apiFetch<DetailedForecastResponse>(
    "/api/v1/forecast/detailed",
    { base: "forecast" }
  );
  if (!forecast) {
    return (
      <SectionError title="nws forecast" message="failed to get forecast" />
    );
  } else {
    if (forecast.periods && forecast.periods.length > 0) {
      return (
        <Container>
          <Title title="nws forecast" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {forecast.periods.map((period) => (
              <div
                key={period.name}
                className="rounded-lg border bg-secondary/30 p-4"
              >
                <h3 className="text-sm font-semibold text-muted-foreground">{period.name}</h3>
                <Separator className="my-2" />
                <div className="flex items-center gap-3">
                  <WeatherIcon icon={period.icon} className="h-7 w-7 shrink-0" />
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-sm">{period.short_forecast}</p>
                    <p className="font-mono-data text-sm font-semibold">
                      {period.time_of_day == "day" ? "High:" : "Low:"}{" "}
                      {period.temperature}°F
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {period.wind_speed} {period.wind_direction} — {period.beaufort.toLowerCase()}
                    </p>
                  </div>
                </div>
                <Separator className="my-2" />
                <p className="text-xs leading-relaxed text-muted-foreground">{period.detailed_forecast}</p>
              </div>
            ))}
          </div>
        </Container>
      );
    }
  }
}
