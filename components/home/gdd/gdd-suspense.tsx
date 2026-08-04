import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Skeleton } from "@/components/ui/skeleton";

export default function GDDContainerSuspense() {
  return (
    <Container>
      <Title title="degree days" />
      <div className="mb-4 flex items-baseline gap-3">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-4 w-56" />
      </div>
      <Skeleton className="h-[220px] w-full rounded-lg" />
    </Container>
  );
}
