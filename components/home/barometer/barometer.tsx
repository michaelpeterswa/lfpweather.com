import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { ZambrettiForecast } from "./types";

const INHG_PER_HPA = 1 / 33.8639;

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "rising")
    return <TrendingUp className="h-4 w-4 text-accent" aria-hidden />;
  if (trend === "falling")
    return <TrendingDown className="h-4 w-4 text-accent" aria-hidden />;
  return <Minus className="h-4 w-4 text-accent" aria-hidden />;
}

// BarometerContainer fetches the Zambretti forecast and shows the outlook text
// with the current pressure and its trend.
export default async function BarometerContainer() {
  const res = await fetch(`${process.env.API_BASE_URL ?? ""}/api/v1/zambretti`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.API_KEY ?? "",
    },
  });

  if (res.status !== 200) {
    return (
      <Container isAlert>
        <Title title="barometer forecast" />
        <p className="text-destructive text-sm">failed to get barometer forecast</p>
      </Container>
    );
  }

  const s = (await res.json()) as ZambrettiForecast;
  const inHg = (s.pressure_hpa * INHG_PER_HPA).toFixed(2);

  return (
    <Container>
      <Title title="barometer forecast" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            outlook
          </p>
          <p className="font-mono-data mt-1 text-2xl font-bold tracking-tight lg:text-3xl">
            {s.text}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            A rough short-range outlook read from the barometer (Zambretti
            method) &mdash; a companion to the detailed forecasts above.
          </p>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-xs text-muted-foreground">pressure</p>
            <p className="font-mono-data text-xl font-bold tracking-tight">
              {inHg}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                inHg
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">trend</p>
            <p className="font-mono-data flex items-center gap-1 text-xl font-bold tracking-tight">
              <TrendIcon trend={s.trend} />
              {s.trend}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
