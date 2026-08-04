import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";

export default function AIInsightsContainerSuspense() {
  return (
    <Container>
      <Title title="at a glance" />
      <div className="rounded-lg border bg-secondary/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-accent" />
          <h2 className="text-sm font-semibold">AI Insights</h2>
        </div>
        <div className="space-y-3">
          {[0, 1, 2].map((idx) => (
            <div key={idx}>
              {idx > 0 && <Separator className="mb-3" />}
              <Skeleton className="h-3.5 w-[120px] mb-2" />
              <Skeleton className="h-3.5 w-full mb-1" />
              <Skeleton className="h-3.5 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
