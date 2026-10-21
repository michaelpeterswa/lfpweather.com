import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Skeleton } from "@/components/ui/skeleton";

export default function BirdnetContainerSuspense() {
  return (
    <Container>
      <Title title="BirdNET 24h" />
      <div className="space-y-3">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-3 flex-1" />
            <Skeleton className="h-3 w-8" />
          </div>
        ))}
      </div>
    </Container>
  );
}
