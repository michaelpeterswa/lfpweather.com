import { LineChartCard } from "@/components/home/charts/line/line";
import {
  LineChartCardConfig,
  LineSection,
} from "@/components/home/charts/line/types";
import { QueryResponse } from "./types";
import { apiFetch } from "@/lib/api";
import { ChartCardError } from "@/components/layout/error-state";

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
  const res = await apiFetch<QueryResponse>("/api/v1/query", {
    body: { metric, range, aggregations: ["avg", "min", "max"] },
  });

  const chartData =
    res !== null
      ? res.points.map(
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
      <ChartCardError
        title={lineChartCardConfig.title}
        description={lineChartCardConfig.description}
        message={
          chartData === null
            ? `failed to get ${metric}`
            : `no data for ${metric}`
        }
      />
    );
  }

  lineChartCardConfig.chartData = chartData;

  return <LineChartCard config={lineChartCardConfig} />;
}
