import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChartCard } from "./line";
import { LineChartCardConfig, LineSection } from "./types";
import { CloudLightning } from "lucide-react";

export default async function LineWrapper({
  field,
  lineChartCardConfig,
  lookback,
}: {
  field: string;
  lineChartCardConfig: LineChartCardConfig;
  lookback: string;
}) {
  const res = await fetch(
    `${process.env.API_BASE_URL ?? ""}/api/v1/${field}/${lookback}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY ?? "",
      },
    }
  );

  if (res.status !== 200) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold tracking-wide">
            {lineChartCardConfig.title}
          </CardTitle>
          <CardDescription className="text-xs">{lineChartCardConfig.description}</CardDescription>
        </CardHeader>
        <CardContent className="bg-red-50 dark:bg-red-950 border-destructive border rounded-lg p-4 m-4">
          <div className="flex flex-col items-center">
            <CloudLightning size={48} className="text-destructive flex-grow" />
            <h1 className="text-destructive flex-none">failed to get {field}</h1>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    const chartData = (await res.json()) as LineSection[];

    lineChartCardConfig.chartData = chartData;

    return <LineChartCard config={lineChartCardConfig} />;
  }
}
