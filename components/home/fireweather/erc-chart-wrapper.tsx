import { QueryResponse } from "@/components/home/solar/types";
import { ErcChart } from "./erc-chart";
import { ErcPoint } from "./types";
import { apiFetch } from "@/lib/api";
import { ChartCardError } from "@/components/layout/error-state";

// ErcChartWrapper fetches the ERC series from the structured query endpoint and
// adapts it for ErcChart. It reuses the shared QueryResponse shape. The window
// is recent, so it never includes the late-2024 spin-up rows.
export default async function ErcChartWrapper({
  p90,
  p97,
}: {
  p90: number;
  p97: number;
}) {
  const res = await apiFetch<QueryResponse>("/api/v1/query", {
    body: {
      metric: "erc",
      range: "90d",
      aggregations: ["avg", "min", "max"],
    },
  });

  const data =
    res !== null
      ? res.points.map(
          (p): ErcPoint => ({
            time: p.time,
            min: p.min ?? p.avg ?? 0,
            avg: p.avg ?? 0,
            max: p.max ?? p.avg ?? 0,
          })
        )
      : null;

  if (data === null || data.length === 0) {
    return (
      <ChartCardError
        title="Energy release trend"
        description="90-day Energy Release Component"
        message={data === null ? "failed to get erc" : "no data for erc"}
      />
    );
  }

  return <ErcChart data={data} p90={p90} p97={p97} />;
}
