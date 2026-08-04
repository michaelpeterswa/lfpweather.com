import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Skeleton } from "@/components/ui/skeleton";

export default function HeatStressContainerSuspense() {
  return (
    <Container>
      <Title title="heat stress" />
      <div className="flex flex-col gap-4 rounded-lg border border-l-4 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <Skeleton className="h-3 w-28 mb-2" />
          <Skeleton className="h-9 w-40" />
        </div>
        <div className="flex gap-6">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-16" />
        </div>
      </div>
    </Container>
  );
}
