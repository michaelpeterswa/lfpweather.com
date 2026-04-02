import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { BrainCircuit } from "lucide-react";

export default function AIForecastContainerSuspense() {
  return (
    <Container>
      <Title title="ai forecast" />
      <div className="rounded-lg border bg-secondary/30 p-4">
        <div className="flex items-center gap-2 mb-1">
          <BrainCircuit className="h-5 w-5 text-accent" />
          <h2 className="text-sm font-semibold">Two-Day Forecast Summary</h2>
        </div>
        <Skeleton className="h-3 w-[150px] mb-3" />
        <Separator className="mb-3" />
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
        </div>
      </div>
    </Container>
  );
}
