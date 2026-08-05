import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Skeleton } from "@/components/ui/skeleton";

// PeriodCardSkeleton mirrors a single period card while its data loads.
export function PeriodCardSkeleton({ heading }: { heading: string }) {
  return (
    <Container>
      <Title title={heading} />
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    </Container>
  );
}

// RecordsOverviewSkeleton mirrors the five-card overview grid.
export function RecordsOverviewSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {["Today", "This Week", "This Month", "This Year", "All-Time"].map((h) => (
        <PeriodCardSkeleton key={h} heading={h} />
      ))}
    </div>
  );
}
