import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import PeriodCard from "./period-card";
import { fetchRecords } from "./fetch";
import { CURRENT_LABEL, RECORD_PERIODS } from "./types";

// RecordsOverview fetches every in-progress period and shows one card each.
export default async function RecordsOverview() {
  const results = await Promise.all(RECORD_PERIODS.map((p) => fetchRecords(p)));

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {RECORD_PERIODS.map((period, i) => {
        const data = results[i];
        const heading = CURRENT_LABEL[period];
        if (!data) {
          return (
            <Container key={period} isAlert>
              <Title title={heading} />
              <p className="text-destructive text-sm">failed to load {heading} records</p>
            </Container>
          );
        }
        return (
          <PeriodCard
            key={period}
            heading={heading}
            data={data}
            withYear={period === "all"}
          />
        );
      })}
    </div>
  );
}
