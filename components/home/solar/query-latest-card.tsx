import { formatDistance } from "date-fns";
import { QueryResponse } from "./types";

export type SolarLatestCardProps = {
  metric: string;
  title: string;
  unit: string;
  transform?: (n: number) => number;
};

// SolarLatestCard is the /api/v1/query analog of CurrentCard: it asks for the
// last value in a bucket and renders the same compact tile.
//
// Unlike CurrentCard it cannot use a /last endpoint, because those exist only
// for a fixed set of weather metrics and none of the power ones. It therefore
// reads the last point of a bucketed series, which is why the bucket size
// matters to the timestamp and not just to the value.
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
      // The bucket size sets how wrong the timestamp can be, because a point's
      // `time` is the START of its bucket rather than the moment of the
      // reading. With a 1d bucket the card said "about 7 hours ago" for a
      // value seconds old at 07:07 UTC, and drifted further as the day went on
      // -- it was reporting the distance to midnight.
      //
      // 5m is the finest bucket the API offers, so the displayed age is now
      // correct to within five minutes. 24h of range keeps the tile working
      // across an overnight gap while asking for 288 points instead of 2016.
      range: "24h",
      bucket: "5m",
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
