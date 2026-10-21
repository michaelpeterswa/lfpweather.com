import { formatDistance } from "date-fns";
import { QueryResponse } from "@/components/home/solar/types";
import { apiFetch } from "@/lib/api";

const COMPASS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
];

// compassPoint names a bearing in degrees on the 16-point compass.
export function compassPoint(degrees: number): string {
  const i = Math.round((((degrees % 360) + 360) % 360) / 22.5) % 16;
  return COMPASS[i];
}

async function latest(metric: string) {
  const res = await apiFetch<QueryResponse>("/api/v1/query", {
    body: { metric, range: "24h", bucket: "5m", aggregations: ["last"] },
  });
  const points = res?.points ?? [];
  const p = points.length > 0 ? points[points.length - 1] : undefined;
  return p && p.last !== undefined && p.last !== null
    ? { value: p.last, time: p.time }
    : undefined;
}

// WindCard shows the 10-minute average wind with the direction it blows from.
// The direction of calm air is meaningless (the station reports 0, which reads
// as north), so below the threshold the tile says calm instead.
export default async function WindCard() {
  const [speed, dir] = await Promise.all([
    latest("vantagepro2plus.wind_speed_avg_last_10_min"),
    latest("vantagepro2plus.wind_dir_avg_last_10_min"),
  ]);

  if (!speed) {
    return (
      <div className="rounded-lg border border-destructive bg-red-50 dark:bg-red-950 p-3">
        <p className="text-xs text-muted-foreground">Wind</p>
        <p className="font-mono-data text-sm font-semibold text-destructive">error</p>
      </div>
    );
  }

  const calm = speed.value < 0.5;
  const formattedTime = formatDistance(Date.parse(speed.time), new Date(), {
    addSuffix: true,
  });

  return (
    <div className="rounded-lg border bg-secondary/50 p-3 hover:bg-secondary/80 transition-colors">
      <p className="text-xs text-muted-foreground truncate">Wind (10 min avg)</p>
      <p className="font-mono-data text-xl font-bold tracking-tight mt-0.5">
        {calm ? (
          "calm"
        ) : (
          <>
            {speed.value.toFixed(1)}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              mph{dir ? ` ${compassPoint(dir.value)}` : ""}
            </span>
          </>
        )}
      </p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{formattedTime}</p>
    </div>
  );
}
