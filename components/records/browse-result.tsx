import PeriodCard from "./period-card";
import { fetchRecords } from "./fetch";
import { RecordPeriod, browseHeading } from "./types";
import { SectionError } from "@/components/layout/error-state";

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
      <SectionError title="selected period" message="failed to load records for that period" />
    );
  }

  return <PeriodCard heading={browseHeading(period, data.start)} data={data} withYear />;
}
