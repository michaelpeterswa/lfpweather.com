import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function ForecastContainerSuspense() {
  return (
    <Container>
      <Title title="nws forecast" />
      <div className="flex flex-col justify-center items-center">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="bg-base border rounded-lg shadow p-4 mb-4 w-11/12"
          >
            <Skeleton className="h-6 w-3/5 md:w-1/5" />
            <Separator className="mt-3 mb-2" />
            <div className="flex flex-row items-center">
              <div className="px-4">
                <Skeleton className="h-8 w-8" />
              </div>
              <div className="flex flex-col grow space-y-3 align-middle">
                <Skeleton className="h-3 w-3/4 md:w-1/4" />
                <Skeleton className="h-3 w-3/4 md:w-1/5" />
                <Skeleton className="h-3 w-3/4 md:w-1/6" />
              </div>
            </div>
            <Separator className="mt-3 mb-2" />
            <div className="space-y-3">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
