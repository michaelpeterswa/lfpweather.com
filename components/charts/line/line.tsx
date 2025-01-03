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

    // replace with at some point: https://www.npmjs.com/package/regression
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
    <Card className="w-11/12 md:w-5/12">
      <CardHeader>
        <CardTitle className="tracking-widest">{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
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
            <CartesianGrid vertical={false} />
            <YAxis
              domain={["auto", "auto"]}
              tickCount={5}
              scale={"linear"}
              unit={config.unit}
            />
            <XAxis dataKey="time" tickLine={true} axisLine={true} />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Line
              dataKey="min"
              type="monotone"
              stroke="#64beff44"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="avg"
              type="monotone"
              stroke="#64beff"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="max"
              type="monotone"
              stroke="#64beff44"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {config.trend && <TrendContents trend={config.trend} />}
        <div className="leading-none text-muted-foreground">
          {config.footer}
        </div>
      </CardFooter>
    </Card>
  );
}

function TrendContents({ trend }: { trend: Trend }) {
  if (trend.direction === TrendDirection.Up) {
    return (
      <div className="flex gap-2 font-medium leading-none">
        Trending up by {trend.percentage}% <TrendingUp className="h-4 w-4" />
      </div>
    );
  } else if (trend.direction === TrendDirection.Down) {
    return (
      <div className="flex gap-2 font-medium leading-none">
        Trending down by {trend.percentage}%{" "}
        <TrendingDown className="h-4 w-4" />
      </div>
    );
  } else {
    return (
      <div className="flex gap-2 font-medium leading-none">Trending flat</div>
    );
  }
}
