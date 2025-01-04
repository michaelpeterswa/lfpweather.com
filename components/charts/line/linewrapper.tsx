import { LineChartCard } from "./line";
import { LineChartCardConfig, LineSection } from "./types";

async function getData(
  baseurl: string,
  apikey: string,
  field: string,
  lookback: string
): Promise<LineSection[]> {
  const res = await fetch(`${baseurl}/api/v1/${field}/${lookback}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apikey,
    },
  });
  if (res.status === 200) {
    return res.json() as Promise<LineSection[]>;
  } else {
    throw new Error("failed to get deployments");
  }
}

export default async function LineWrapper({
  field,
  lineChartCardConfig,
  lookback,
}: {
  field: string;
  lineChartCardConfig: LineChartCardConfig;
  lookback: string;
}) {
  const chartData = await getData(
    process.env.API_BASE_URL ?? "",
    process.env.API_KEY ?? "",
    field,
    lookback
  );

  lineChartCardConfig.chartData = chartData;

  return <LineChartCard config={lineChartCardConfig} />;
}
