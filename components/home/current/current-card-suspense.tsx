import { Card } from "../../ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function CurrentCardSuspense() {
  return (
    <Card className="w-11/12 md:w-1/4">
      <div className="flex flex-col justify-between items-center space-y-2 py-3 h-full">
        <Skeleton className="h-3 w-1/4 md:w-1/2" />
        <Skeleton className="h-4 w-1/6 md:w-1/3" />
        <Skeleton className="h-3 w-1/3 md:w-2/3" />
      </div>
    </Card>
  );
}
