import { Separator } from "@/components/ui/separator";
import Container from "../../layout/container/container";
import Title from "../../layout/container/title";
import { AIForecastResponse } from "./types";
import { BrainCircuit } from "lucide-react";
import { formatDistance } from "date-fns";
import ShareButton from "@/components/share/share-button";
import WeatherIcon from "@/components/weather/icons";

export default async function AIForecastContainer() {
  const res = await fetch(
    `${
      process.env.FORECAST_INFERENCE_API_BASE_URL ?? ""
    }/api/v1/forecast/summary`,
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
        <Title title="ai forecast" />
        <div className="border-destructive bg-red-50 dark:bg-red-950 border rounded-lg p-4 flex justify-center">
          <h1>failed to get ai forecast</h1>
        </div>
      </Container>
    );
  } else {
    const forecast = (await res.json()) as AIForecastResponse;

    if (forecast) {
      const formattedTime = formatDistance(
        Date.parse(forecast.last_updated),
        new Date(),
        {
          addSuffix: true,
        }
      );

      return (
        <Container>
          <Title title="ai forecast" />
          <div className="rounded-lg border bg-secondary/30 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <BrainCircuit className="h-5 w-5 text-accent" />
                  <h2 className="text-sm font-semibold">Two-Day Forecast Summary</h2>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{formattedTime}</p>
                <Separator className="mb-3" />
                <p className="text-sm leading-relaxed">{forecast.summary}</p>
              </div>
              <div className="flex flex-col items-center gap-2 shrink-0">
                {WeatherIcon({
                  icon: forecast.icon,
                  className: "h-8 w-8 lg:h-10 lg:w-10",
                })}
                <ShareButton
                  props={{
                    title: "lfpweather ai forecast",
                    description: forecast.summary,
                    url: "https://lfpweather.com#ai-forecast",
                    className: "h-4 w-4",
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      );
    }
  }
}
