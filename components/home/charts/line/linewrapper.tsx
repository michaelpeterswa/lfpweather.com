import { LineChartCard } from "./line";
import { LineChartCardConfig, LineSection } from "./types";
import { apiFetch } from "@/lib/api";
import { ChartCardError } from "@/components/layout/error-state";

export default async function LineWrapper({
  field,
  lineChartCardConfig,
  lookback,
}: {
  field: string;
  lineChartCardConfig: LineChartCardConfig;
  lookback: string;
}) {
  const chartData = await apiFetch<LineSection[]>(
    `/api/v1/${field}/${lookback}`
  );

  if (!chartData) {
    return (
      <ChartCardError
        title={lineChartCardConfig.title}
        description={lineChartCardConfig.description}
        message={`failed to get ${field}`}
      />
    );
  } else {
    lineChartCardConfig.chartData = chartData;

    return <LineChartCard config={lineChartCardConfig} />;
  }
}
