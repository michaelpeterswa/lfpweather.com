import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudLightning } from "lucide-react";
import { QueryResponse } from "@/components/home/solar/types";
import { ErcChart } from "./erc-chart";
import { ErcPoint } from "./types";

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
  const res = await fetch(`${process.env.API_BASE_URL ?? ""}/api/v1/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.API_KEY ?? "",
    },
    body: JSON.stringify({
      metric: "erc",
      range: "90d",
      aggregations: ["avg", "min", "max"],
    }),
  });

  const data =
    res.status === 200
      ? (await res.json() as QueryResponse).points.map(
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
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold tracking-wide">
            Energy release trend
          </CardTitle>
          <CardDescription className="text-xs">
            90-day Energy Release Component
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-red-50 dark:bg-red-950 border-destructive border rounded-lg p-4 m-4">
          <div className="flex flex-col items-center">
            <CloudLightning size={48} className="text-destructive flex-grow" />
            <h1 className="text-destructive flex-none">
              {data === null ? "failed to get erc" : "no data for erc"}
            </h1>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <ErcChart data={data} p90={p90} p97={p97} />;
}
