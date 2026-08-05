import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import BrowseForm from "@/components/records/browse-form";
import BrowseResult from "@/components/records/browse-result";
import RecordsOverview from "@/components/records/records-overview";
import {
  PeriodCardSkeleton,
  RecordsOverviewSkeleton,
} from "@/components/records/records-suspense";
import { isRecordPeriod } from "@/components/records/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "records · lfpweather.com",
  description: "record highs and lows for the Lake Forest Park weather station",
};

export default async function RecordsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string; at?: string }>;
}) {
  const sp = await searchParams;
  const browsePeriod = isRecordPeriod(sp.period) ? sp.period : undefined;
  const browseAt = sp.at || undefined;
  const showBrowse = Boolean(browsePeriod && browseAt);

  return (
    <div className="space-y-6">
      <Container>
        <Title title="records" />
        <p className="text-sm leading-relaxed">
          Record highs and lows for the Lake Forest Park station over the current day,
          week, month, year, and all time. Pick a period and a date to look back at a
          completed period.
        </p>
        <BrowseForm period={browsePeriod} at={browseAt} />
      </Container>

      {showBrowse && (
        <Suspense fallback={<PeriodCardSkeleton heading="selected period" />}>
          <BrowseResult period={browsePeriod!} at={browseAt!} />
        </Suspense>
      )}

      <Suspense fallback={<RecordsOverviewSkeleton />}>
        <RecordsOverview />
      </Suspense>
    </div>
  );
}
