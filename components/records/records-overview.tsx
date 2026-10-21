import { Suspense } from "react";
import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import PeriodCard from "./period-card";
import { fetchRecords } from "./fetch";
import { PeriodCardSkeleton } from "./records-suspense";
import { CURRENT_LABEL, RECORD_PERIODS, RecordPeriod } from "./types";

// RecordsOverview shows one card per in-progress period. Each card loads behind
// its own Suspense boundary, so a slow period (all-time scans the whole
// history) does not hold the others on their skeletons.
export default function RecordsOverview() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {RECORD_PERIODS.map((period) => (
        <Suspense
          key={period}
          fallback={<PeriodCardSkeleton heading={CURRENT_LABEL[period]} />}
        >
          <PeriodOverview period={period} />
        </Suspense>
      ))}
    </div>
  );
}

async function PeriodOverview({ period }: { period: RecordPeriod }) {
  const data = await fetchRecords(period);
  const heading = CURRENT_LABEL[period];
  if (!data) {
    return (
      <Container isAlert>
        <Title title={heading} />
        <p className="text-destructive text-sm">failed to load {heading} records</p>
      </Container>
    );
  }
  return (
    <PeriodCard heading={heading} data={data} withYear={period === "all"} />
  );
}
