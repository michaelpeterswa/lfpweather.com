import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Skeleton } from "@/components/ui/skeleton";

export default function FireWeatherContainerSuspense() {
  return (
    <Container>
      <Title title="fire weather" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-l-4 bg-card p-4">
          <Skeleton className="h-3 w-1/3 mb-2" />
          <Skeleton className="h-9 w-2/3 mb-3" />
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-4/5 mb-4" />
          <Skeleton className="h-2 w-full" />
        </div>
        <div className="space-y-4 lg:col-span-2">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="rounded-lg border bg-secondary/50 p-3">
                <Skeleton className="h-3 w-2/3 mb-2" />
                <Skeleton className="h-6 w-1/2 mb-1" />
                <Skeleton className="h-2 w-3/4" />
              </div>
            ))}
          </div>
          <Skeleton className="h-[220px] w-full rounded-lg" />
        </div>
      </div>
    </Container>
  );
}
