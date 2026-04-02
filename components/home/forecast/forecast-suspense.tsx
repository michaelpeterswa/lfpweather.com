import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function ForecastContainerSuspense() {
  return (
    <Container>
      <Title title="nws forecast" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="rounded-lg border bg-secondary/30 p-4"
          >
            <Skeleton className="h-4 w-1/3" />
            <Separator className="my-2" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-7 rounded shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Separator className="my-2" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
