import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { cn } from "@/lib/utils";
import { FIRE_BORDER_L, FIRE_TEXT } from "@/components/home/fireweather/fire-levels";
import { WBGTReading } from "./types";

const cToF = (c: number) => Math.round(c * 1.8 + 32);

function Stat({
  label,
  valueF,
  colorClass,
}: {
  label: string;
  valueF: number;
  colorClass?: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn("font-mono-data text-2xl font-bold tracking-tight", colorClass)}>
        {valueF}
        <span className="ml-1 text-sm font-normal text-muted-foreground">&deg;F</span>
      </p>
    </div>
  );
}

// HeatStressContainer fetches the current wet bulb globe temperature and shows
// the heat-stress class with the WBGT, black-globe, and air temperatures. The
// class uses the shared fire color scale (its 0..4 level).
export default async function HeatStressContainer() {
  const res = await fetch(`${process.env.API_BASE_URL ?? ""}/api/v1/wbgt`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.API_KEY ?? "",
    },
  });

  if (res.status !== 200) {
    return (
      <Container isAlert>
        <Title title="heat stress" />
        <p className="text-destructive text-sm">failed to get heat stress</p>
      </Container>
    );
  }

  const s = (await res.json()) as WBGTReading;

  return (
    <Container>
      <Title title="heat stress" />
      <div
        className={cn(
          "flex flex-col gap-4 rounded-lg border border-l-4 bg-card p-4 sm:flex-row sm:items-center sm:justify-between",
          FIRE_BORDER_L[s.level]
        )}
      >
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            heat stress (WBGT)
          </p>
          <p
            className={cn(
              "font-mono-data mt-1 text-3xl font-bold tracking-tight lg:text-4xl",
              FIRE_TEXT[s.level]
            )}
          >
            {s.category}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Wet bulb globe temperature &mdash; the outdoor heat-stress standard,
            combining sun, humidity, and wind.
          </p>
        </div>
        <div className="flex gap-6">
          <Stat label="WBGT" valueF={Math.round(s.wbgt_f)} colorClass={FIRE_TEXT[s.level]} />
          <Stat label="globe" valueF={cToF(s.globe_c)} />
          <Stat label="air" valueF={cToF(s.air_c)} />
        </div>
      </div>
    </Container>
  );
}
