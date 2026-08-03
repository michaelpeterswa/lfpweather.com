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
import { LineChartCardConfig, LineSection, Trend, TrendDirection } from "./types";
import { formatSiteLong, formatSiteShort } from "@/lib/datetime";
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
export function LineChartCard({ config }: { config: LineChartCardConfig }) {
  const points = config.chartData ?? [];

  // Derived, not assigned back onto `config`. The previous version mutated the
  // caller's object and rewrote every `section.time` in place during render.
  // That is what made the server and client passes disagree: the server left
  // UTC-formatted strings in the HTML while the client re-derived local ones
  // from the original payload, and React reported a hydration mismatch
  // (error #418) on every chart.
  const footer = config.footer ?? footerFor(points);
  const trend = config.trend ?? trendFor(points);

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
            data={points}
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
            {/*
              Formatted here rather than by rewriting the data, so the points
              keep their original ISO timestamps and the tooltip can format
              them independently. The zone is fixed, so this renders the same
              on the server and in the browser.

              `unit` is deliberately not set: it belongs to the value axis, and
              on the time axis it produced ticks like "8/3/2026, 5:00:00 AM°F".
            */}
            <XAxis
              dataKey="time"
              tickLine={true}
              axisLine={true}
              tickFormatter={formatSiteShort}
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
        {trend && <TrendContents trend={trend} />}
        <div className="leading-none text-muted-foreground text-xs">
          {footer}
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

// footerFor names the start of the window in the site's timezone.
//
// The previous wording came from date-fns `formatRelative`, which switches
// between "last Friday at 11:30 PM" and "07/27/2026" depending on how long ago
// the point is, and formats in whichever timezone the code happens to run in.
// An absolute, zone-stamped time says the same thing in one form and means the
// same thing to a reader anywhere.
function footerFor(points: LineSection[]): string | undefined {
  if (points.length === 0) {
    return undefined;
  }

  return `Since ${formatSiteLong(points[0].time)}`;
}

// trendFor compares the first and last averages.
//
// The guard matters: the first bucket's average is null whenever the sensor
// reported nothing in it, which is exactly what a newly installed device does.
// Dividing by it produced "Trending up by Infinity%" on the battery charge
// chart. A baseline of zero has no meaningful percentage change either, so
// both cases report flat rather than inventing a number.
function trendFor(points: LineSection[]): Trend | undefined {
  if (points.length < 2) {
    return undefined;
  }

  const first = points[0].avg;
  const last = points[points.length - 1].avg;

  if (first === null || first === undefined || !Number.isFinite(first) || first === 0) {
    return { direction: TrendDirection.Flat };
  }
  if (last === null || last === undefined || !Number.isFinite(last)) {
    return { direction: TrendDirection.Flat };
  }

  const percentageChange = ((last - first) / first) * 100;
  if (!Number.isFinite(percentageChange)) {
    return { direction: TrendDirection.Flat };
  }

  if (percentageChange > 1) {
    return {
      direction: TrendDirection.Up,
      percentage: Math.abs(percentageChange).toFixed(1),
    };
  }
  if (percentageChange < -1) {
    return {
      direction: TrendDirection.Down,
      percentage: Math.abs(percentageChange).toFixed(1),
    };
  }

  return { direction: TrendDirection.Flat };
}
