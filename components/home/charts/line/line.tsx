"use client";
import { TrendingDown, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatRelative } from "date-fns";
import { LineChartCardConfig, Trend, TrendDirection } from "./types";
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
export function LineChartCard({ config }: { config: LineChartCardConfig }) {
  if (!config.footer && config.chartData) {
    const relativeDate = formatRelative(
      Date.parse(config.chartData[0].time),
      new Date()
    );

    config.footer = `Since ${relativeDate}`;
  }

  if (config.chartData) {
    for (const section of config.chartData) {
      const tmpDate = Date.parse(section.time);
      section.time = new Date(tmpDate).toLocaleString();
    }

    const firstPoint = config.chartData[0];
    const lastPoint = config.chartData[config.chartData.length - 1];

    const percentageChange =
      ((lastPoint.avg - firstPoint.avg) / firstPoint.avg) * 100;

    if (!config.trend) {
      if (percentageChange > 1) {
        config.trend = {
          direction: TrendDirection.Up,
          percentage: Math.abs(percentageChange).toFixed(1),
        };
      } else if (percentageChange < -1) {
        config.trend = {
          direction: TrendDirection.Down,
          percentage: Math.abs(percentageChange).toFixed(1),
        };
      } else {
        config.trend = {
          direction: TrendDirection.Flat,
        };
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold tracking-wide">{config.title}</CardTitle>
        <CardDescription className="text-xs">{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={config.chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeOpacity={0.3} />
            <YAxis
              domain={["auto", "auto"]}
              tickCount={3}
              scale={"linear"}
              unit={config.unit}
              width={30}
            />
            <XAxis
              dataKey="time"
              tickLine={true}
              axisLine={true}
              unit={config.unit}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Line
              dataKey="min"
              type="monotone"
              stroke="hsl(var(--chart-2))"
              strokeWidth={1.5}
              strokeOpacity={0.3}
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
              strokeOpacity={0.3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm pt-0">
        {config.trend && <TrendContents trend={config.trend} />}
        <div className="leading-none text-muted-foreground text-xs">
          {config.footer}
        </div>
      </CardFooter>
    </Card>
  );
}

function TrendContents({ trend }: { trend: Trend }) {
  if (trend.direction === TrendDirection.Up) {
    return (
      <div className="flex gap-2 font-medium leading-none text-xs">
        Trending up by {trend.percentage}% <TrendingUp className="h-3.5 w-3.5 text-accent" />
      </div>
    );
  } else if (trend.direction === TrendDirection.Down) {
    return (
      <div className="flex gap-2 font-medium leading-none text-xs">
        Trending down by {trend.percentage}%{" "}
        <TrendingDown className="h-3.5 w-3.5 text-accent" />
      </div>
    );
  } else {
    return (
      <div className="flex gap-2 font-medium leading-none text-xs">Trending flat</div>
    );
  }
}
