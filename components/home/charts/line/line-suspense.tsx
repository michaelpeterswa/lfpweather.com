import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChartCardConfig } from "./types";

// LineChartCardSuspense holds a chart card's place while its data loads. The
// title and description are known up front, so they render for real.
export default function LineChartCardSuspense({
  config,
}: {
  config: LineChartCardConfig;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold tracking-wide">
          {config.title}
        </CardTitle>
        <CardDescription className="text-xs">{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full rounded-lg" />
      </CardContent>
    </Card>
  );
}
