import { Separator } from "@/components/ui/separator";
import Container from "../../layout/container/container";
import Title from "../../layout/container/title";
import { AIInsightResponse, InsightConfig } from "./types";
import { Sparkles } from "lucide-react";
import { formatDistance } from "date-fns";
import WeatherIcon from "@/components/weather/icons";

const INSIGHTS: InsightConfig[] = [
  { key: "current", label: "Right Now", path: "/api/v1/current" },
  { key: "smoke", label: "Smoke Outlook", path: "/api/v1/smoke" },
  { key: "fire", label: "Fire Weather", path: "/api/v1/fire_weather" },
];

async function fetchInsight(path: string): Promise<AIInsightResponse | null> {
  try {
    const res = await fetch(
      `${process.env.FORECAST_INFERENCE_API_BASE_URL ?? ""}${path}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.API_KEY ?? "",
        },
      }
    );
    if (res.status !== 200) {
      return null;
    }
    return (await res.json()) as AIInsightResponse;
  } catch {
    return null;
  }
}

export default async function AIInsightsContainer() {
  const results = await Promise.all(INSIGHTS.map((i) => fetchInsight(i.path)));
  const rows = INSIGHTS.map((config, idx) => ({
    config,
    data: results[idx],
  })).filter((row): row is { config: InsightConfig; data: AIInsightResponse } =>
    Boolean(row.data)
  );

  if (rows.length === 0) {
    return (
      <Container isAlert>
        <Title title="at a glance" />
        <div className="border-destructive bg-red-50 dark:bg-red-950 border rounded-lg p-4 flex justify-center">
          <h1>failed to get insights</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Title title="at a glance" />
      <div className="rounded-lg border bg-secondary/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-accent" />
          <h2 className="text-sm font-semibold">AI Insights</h2>
        </div>
        <div className="space-y-3">
          {rows.map((row, idx) => {
            const formattedTime = formatDistance(
              Date.parse(row.data.last_updated),
              new Date(),
              { addSuffix: true }
            );

            return (
              <div key={row.config.key}>
                {idx > 0 && <Separator className="mb-3" />}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold">
                        {row.config.label}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {formattedTime}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{row.data.summary}</p>
                  </div>
                  <div className="shrink-0">
                    {WeatherIcon({
                      icon: row.data.icon,
                      className: "h-7 w-7 lg:h-8 lg:w-8",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
