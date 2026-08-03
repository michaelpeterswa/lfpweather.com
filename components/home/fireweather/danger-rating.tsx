import { cn } from "@/lib/utils";
import { ERCContext, FireDangerRating } from "./types";
import { FIRE_BG, FIRE_BORDER_L, FIRE_TEXT } from "./fire-levels";

// DangerRating is the hero: the adjective class in its fire color, a one-line
// explanation, and a scale bar showing where today's ERC sits in the season.
export default function DangerRating({
  rating,
  erc,
}: {
  rating: FireDangerRating;
  erc: ERCContext;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-l-4 bg-card p-4 flex flex-col self-start",
        FIRE_BORDER_L[rating.level]
      )}
    >
      <p className="text-xs text-muted-foreground uppercase tracking-wider">
        fire danger
      </p>
      <p
        className={cn(
          "font-mono-data text-3xl lg:text-4xl font-bold tracking-tight mt-1",
          FIRE_TEXT[rating.level]
        )}
      >
        {rating.class}
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        {rating.detail}
      </p>
      <ErcScaleBar erc={erc} />
    </div>
  );
}

// ErcScaleBar draws the five fire bands to scale over the ERC value axis, with
// a marker at the current value. The band widths follow the real percentile
// breakpoints, so the marker's position reads as "where in the season".
function ErcScaleBar({ erc }: { erc: ERCContext }) {
  const scaleMax = Math.max(erc.max, erc.p97 * 1.05, erc.value, 1);
  const width = (a: number, b: number) => Math.max(0, ((b - a) / scaleMax) * 100);
  const widths = [
    width(0, erc.p50),
    width(erc.p50, erc.p80),
    width(erc.p80, erc.p90),
    width(erc.p90, erc.p97),
    width(erc.p97, scaleMax),
  ];
  const markerPct = Math.max(0, Math.min(100, (erc.value / scaleMax) * 100));

  return (
    <div className="mt-4">
      <div className="relative flex h-2 w-full overflow-hidden rounded-full">
        {widths.map((w, i) => (
          <div key={i} className={FIRE_BG[i]} style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="relative h-0">
        <div
          className="absolute -top-3 h-3 w-px -translate-x-1/2 bg-foreground"
          style={{ left: `${markerPct}%` }}
        />
      </div>
      <p className="font-mono-data mt-2 text-[11px] text-muted-foreground">
        ERC {erc.value.toFixed(1)} · {Math.round(erc.percentile * 100)}th percentile
      </p>
    </div>
  );
}
