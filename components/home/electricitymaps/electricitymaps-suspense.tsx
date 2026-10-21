import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Skeleton } from "@/components/ui/skeleton";

export default function ElectricityMapsContainerSuspense() {
  return (
    <Container>
      <Title title="power breakdown" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="rounded-lg border bg-secondary/50 p-3">
            <Skeleton className="h-3 w-2/3 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-1" />
            <Skeleton className="h-2 w-3/4" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-[480px] w-full rounded-lg" />
        ))}
      </div>
    </Container>
  );
}
