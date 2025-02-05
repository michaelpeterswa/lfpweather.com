import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { BrainCircuit } from "lucide-react";

export default function ForecastContainerSuspense() {
  return (
    <Container>
      <Title title="ai forecast" />
      <div className="flex flex-col justify-center items-center">
        <div className="bg-base border rounded-lg shadow p-4 mb-4 w-11/12">
          <div className="pb-2">
            <div className="flex items-center pb-2">
              <BrainCircuit className="h-5 w-5 lg:h-7 lg:w-7 mr-2" />
              <h1 className="text-sm lg:text-xl">Two-Day Forecast Summary</h1>
            </div>
            <div className="text-muted-foreground">
              <Skeleton className="h-4 w-[250px] pt-2" />
            </div>
          </div>
          <Separator />
          <div className="pt-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
