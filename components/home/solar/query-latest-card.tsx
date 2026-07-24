import { formatDistance } from "date-fns";
import { QueryResponse } from "./types";

export type SolarLatestCardProps = {
  metric: string;
  title: string;
  unit: string;
  transform?: (n: number) => number;
};

// SolarLatestCard is the /api/v1/query analog of CurrentCard: it asks for the
// last value in a coarse bucket and renders the same compact tile.
export default async function SolarLatestCard({
  props,
}: {
  props: SolarLatestCardProps;
}) {
  const res = await fetch(`${process.env.API_BASE_URL ?? ""}/api/v1/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.API_KEY ?? "",
    },
    body: JSON.stringify({
      metric: props.metric,
      range: "7d",
      bucket: "1d",
      aggregations: ["last"],
    }),
  });

  const points =
    res.status === 200 ? ((await res.json()) as QueryResponse).points : [];
  const latest = points.length > 0 ? points[points.length - 1] : undefined;

  if (!latest || latest.last === undefined || latest.last === null) {
    return (
      <div className="rounded-lg border border-destructive bg-red-50 dark:bg-red-950 p-3">
        <p className="text-xs text-muted-foreground">{props.title}</p>
        <p className="font-mono-data text-sm font-semibold text-destructive">
          error
        </p>
      </div>
    );
  }

  const value = props.transform ? props.transform(latest.last) : latest.last;
  const formattedTime = formatDistance(Date.parse(latest.time), new Date(), {
    addSuffix: true,
  });

  return (
    <div className="rounded-lg border bg-secondary/50 p-3 hover:bg-secondary/80 transition-colors">
      <p className="text-xs text-muted-foreground truncate">{props.title}</p>
      <p className="font-mono-data text-xl font-bold tracking-tight mt-0.5">
        {formatValue(value)}
        <span className="text-sm font-normal text-muted-foreground ml-1">
          {props.unit}
        </span>
      </p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{formattedTime}</p>
    </div>
  );
}

function formatValue(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}
