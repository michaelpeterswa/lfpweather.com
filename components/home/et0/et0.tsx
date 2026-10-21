import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { ET0Chart } from "./et0-chart";
import { ET0Summary } from "./types";
import { apiFetch } from "@/lib/api";
import { SectionError } from "@/components/layout/error-state";

// ET0Container fetches the year-to-date reference evapotranspiration and shows
// the accumulated water demand plus a cumulative chart.
export default async function ET0Container() {
  const s = await apiFetch<ET0Summary>("/api/v1/et0");

  if (!s) {
    return (
      <SectionError title="evapotranspiration" message="failed to get evapotranspiration" />
    );
  }

  return (
    <Container>
      <Title title="evapotranspiration" />
      <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono-data text-3xl font-bold tracking-tight">
          {Math.round(s.total).toLocaleString()}
          <span className="ml-1 text-lg font-normal text-muted-foreground">mm</span>
        </span>
        <span className="text-sm text-muted-foreground">
          reference water demand &middot; since Jan 1
        </span>
      </div>
      <ET0Chart data={s.daily} />
    </Container>
  );
}
