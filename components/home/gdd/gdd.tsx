import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { GDDChart } from "./gdd-chart";
import { GDDSummary } from "./types";
import { apiFetch } from "@/lib/api";
import { SectionError } from "@/components/layout/error-state";

// GDDContainer fetches the year-to-date growing degree days and shows the
// accumulated total plus a cumulative chart.
export default async function GDDContainer() {
  const s = await apiFetch<GDDSummary>("/api/v1/gdd");

  if (!s) {
    return (
      <SectionError title="degree days" message="failed to get growing degree days" />
    );
  }

  return (
    <Container>
      <Title title="degree days" />
      <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono-data text-3xl font-bold tracking-tight">
          {Math.round(s.total).toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground">
          growing degree days &middot; base {Math.round(s.base_f)}&deg;F &middot; since Jan 1
        </span>
      </div>
      <GDDChart data={s.daily} />
    </Container>
  );
}
