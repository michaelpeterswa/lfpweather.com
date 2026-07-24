import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChartCard } from "@/components/home/charts/line/line";
import {
  LineChartCardConfig,
  LineSection,
} from "@/components/home/charts/line/types";
import { CloudLightning } from "lucide-react";
import { QueryResponse } from "./types";

// QueryLineWrapper is the /api/v1/query analog of LineWrapper: it POSTs a
// structured query for a single metric and adapts the {points:[{time,avg,min,
// max}]} response into the flat LineSection[] the existing LineChartCard draws.
// This is what lets the solar/battery columns (which have no fixed
// /api/v1/{field}/{lookback} routes) reuse the standard chart.
export default async function QueryLineWrapper({
  metric,
  range,
  lineChartCardConfig,
}: {
  metric: string;
  range: string;
  lineChartCardConfig: LineChartCardConfig;
}) {
  const res = await fetch(`${process.env.API_BASE_URL ?? ""}/api/v1/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.API_KEY ?? "",
    },
    body: JSON.stringify({ metric, range, aggregations: ["avg", "min", "max"] }),
  });

  const chartData =
    res.status === 200
      ? ((await res.json()) as QueryResponse).points.map(
          (p): LineSection => ({
            time: p.time,
            min: p.min ?? p.avg ?? 0,
            avg: p.avg ?? 0,
            max: p.max ?? p.avg ?? 0,
          })
        )
      : null;

  // A non-200 response or an empty series can't be charted (LineChartCard
  // indexes chartData[0]); show the same failure card LineWrapper uses.
  if (chartData === null || chartData.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold tracking-wide">
            {lineChartCardConfig.title}
          </CardTitle>
          <CardDescription className="text-xs">
            {lineChartCardConfig.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-red-50 dark:bg-red-950 border-destructive border rounded-lg p-4 m-4">
          <div className="flex flex-col items-center">
            <CloudLightning size={48} className="text-destructive flex-grow" />
            <h1 className="text-destructive flex-none">
              {chartData === null
                ? `failed to get ${metric}`
                : `no data for ${metric}`}
            </h1>
          </div>
        </CardContent>
      </Card>
    );
  }

  lineChartCardConfig.chartData = chartData;

  return <LineChartCard config={lineChartCardConfig} />;
}
