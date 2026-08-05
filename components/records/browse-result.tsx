import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import PeriodCard from "./period-card";
import { fetchRecords } from "./fetch";
import { RecordPeriod, browseHeading } from "./types";

// BrowseResult fetches a single past period selected by the browse form and
// renders it above the current overview.
export default async function BrowseResult({
  period,
  at,
}: {
  period: RecordPeriod;
  at: string;
}) {
  const data = await fetchRecords(period, at);
  if (!data) {
    return (
      <Container isAlert>
        <Title title="selected period" />
        <p className="text-destructive text-sm">failed to load records for that period</p>
      </Container>
    );
  }

  return <PeriodCard heading={browseHeading(period, data.start)} data={data} withYear />;
}
