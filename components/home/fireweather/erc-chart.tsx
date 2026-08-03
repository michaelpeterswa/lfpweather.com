"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatSiteShort } from "@/lib/datetime";
import { ErcPoint } from "./types";

// ChartContainer requires a config; the lines set their colors directly, so
// this is only here to satisfy the prop, matching the other charts.
const chartConfig = {
  desktop: { label: "ERC", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

// ErcChart plots the Energy Release Component with the season's High (p90) and
// Extreme (p97) levels as dashed reference lines. The thresholds are passed in
// from the summary, which recomputes them from the full history, so they track
// the record as it grows.
export function ErcChart({
  data,
  p90,
  p97,
}: {
  data: ErcPoint[];
  p90: number;
  p97: number;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold tracking-wide">
          Energy release trend
        </CardTitle>
        <CardDescription className="text-xs">
          90-day Energy Release Component, with the season&apos;s High and
          Extreme levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12, top: 12 }}
          >
            <CartesianGrid vertical={false} strokeOpacity={0.3} />
            <YAxis domain={[0, "auto"]} tickCount={4} scale="linear" width={30} />
            <XAxis
              dataKey="time"
              tickLine={true}
              axisLine={true}
              tickFormatter={formatSiteShort}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <ReferenceLine
              y={p90}
              stroke="hsl(var(--fire-2))"
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{
                value: "High",
                position: "insideTopLeft",
                fill: "hsl(var(--fire-2))",
                fontSize: 10,
              }}
            />
            <ReferenceLine
              y={p97}
              stroke="hsl(var(--fire-4))"
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{
                value: "Extreme",
                position: "insideTopLeft",
                fill: "hsl(var(--fire-4))",
                fontSize: 10,
              }}
            />
            <Line
              dataKey="min"
              type="monotone"
              stroke="hsl(var(--chart-2))"
              strokeWidth={1.5}
              strokeOpacity={0.25}
              dot={false}
            />
            <Line
              dataKey="avg"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="max"
              type="monotone"
              stroke="hsl(var(--chart-2))"
              strokeWidth={1.5}
              strokeOpacity={0.25}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
