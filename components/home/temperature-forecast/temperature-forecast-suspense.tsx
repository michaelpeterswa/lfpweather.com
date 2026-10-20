import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Skeleton } from "@/components/ui/skeleton";

export default function TemperatureForecastContainerSuspense() {
  return (
    <Container>
      <Title title="station forecast" />
      <Skeleton className="h-3 w-1/2 mb-4" />
      <Skeleton className="h-[260px] w-full rounded-lg" />
    </Container>
  );
}
