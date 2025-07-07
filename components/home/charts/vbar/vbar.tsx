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
  // sort config.chartData by value descending
  if (config.chartData) {
    config.chartData.sort((a, b) => b.value - a.value);
  }
  return (
    <Card className="w-full md:w-5/12">
      <CardHeader>
        <CardTitle className="tracking-widest">{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <BarChart
            accessibilityLayer
            data={config.chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" unit={config.unit} tickCount={5} />
            <YAxis type="category" width={125} dataKey="label" interval={0} />
            <Bar
              dataKey="value"
              fill="#64beff"
              stroke="#00000033"
              radius={[2, 5, 5, 2]}
            />
            <Tooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {config.footer && (
          <div className="text-muted-foreground">{config.footer}</div>
        )}
      </CardFooter>
    </Card>
  );
}
