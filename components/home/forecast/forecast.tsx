import { Separator } from "@/components/ui/separator";
import Container from "../../layout/container/container";
import Title from "../../layout/container/title";
import { DetailedForecastResponse } from "@/components/home/forecast/types";
import WeatherIcon from "@/components/weather/icons";

export default async function ForecastContainer() {
  const res = await fetch(
    `${
      process.env.FORECAST_INFERENCE_API_BASE_URL ?? ""
    }/api/v1/forecast/detailed`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY ?? "",
      },
    }
  );
  if (res.status !== 200) {
    return (
      <Container isAlert>
        <Title title="nws forecast" />
        <div className="border-destructive bg-red-50 dark:bg-red-950 border rounded-lg p-4 flex justify-center">
          <h1>failed to get forecast</h1>
        </div>
      </Container>
    );
  } else {
    const forecast = (await res.json()) as DetailedForecastResponse;

    if (forecast && forecast.periods && forecast.periods.length > 0) {
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
