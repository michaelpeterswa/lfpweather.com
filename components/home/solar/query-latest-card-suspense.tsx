import { Skeleton } from "@/components/ui/skeleton";

export default function SolarLatestCardSuspense({ title }: { title: string }) {
  return (
    <div className="rounded-lg border bg-secondary/50 p-3">
      <p className="text-xs text-muted-foreground truncate">{title}</p>
      <Skeleton className="h-6 w-1/2 mt-1 mb-1" />
      <Skeleton className="h-2 w-3/4" />
    </div>
  );
}
