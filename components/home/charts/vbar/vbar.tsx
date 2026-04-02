"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { VBarChartCardConfig } from "./types";

const chartConfig = {} satisfies ChartConfig;

export function VBarChartCard({ config }: { config: VBarChartCardConfig }) {
  if (config.chartData) {
    config.chartData.sort((a, b) => b.value - a.value);
  }
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold tracking-wide">{config.title}</CardTitle>
        <CardDescription className="text-xs">{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full !aspect-auto">
          <BarChart
            accessibilityLayer
            data={config.chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis type="number" unit={config.unit} tickCount={5} />
            <YAxis type="category" width={125} dataKey="label" interval={0} />
            <Bar
              dataKey="value"
              fill="hsl(var(--chart-1))"
              stroke="hsl(var(--border))"
              radius={[2, 5, 5, 2]}
            />
            <Tooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm pt-0">
        {config.footer && (
          <div className="text-muted-foreground text-xs">{config.footer}</div>
        )}
      </CardFooter>
    </Card>
  );
}
