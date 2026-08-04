"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ET0Point } from "./types";

const chartConfig = {
  desktop: { label: "ET₀", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// formatMonthDay turns a "YYYY-MM-DD" local date string into "Aug 4" without a
// Date, so it renders identically on the server and the client.
function formatMonthDay(iso: string): string {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  return `${MONTHS[parseInt(parts[1], 10) - 1]} ${parseInt(parts[2], 10)}`;
}

// ET0Chart draws the accumulated reference evapotranspiration across the year.
export function ET0Chart({ data }: { data: ET0Point[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-[220px] w-full">
      <AreaChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} strokeOpacity={0.3} />
        <YAxis domain={[0, "auto"]} tickCount={4} width={40} unit="mm" />
        <XAxis
          dataKey="date"
          tickLine={true}
          axisLine={true}
          minTickGap={40}
          tickFormatter={formatMonthDay}
        />
        <ChartTooltip
          cursor={true}
          content={<ChartTooltipContent labelFormatter={(v) => formatMonthDay(String(v))} />}
        />
        <Area
          dataKey="accumulated"
          type="monotone"
          stroke="hsl(var(--chart-3))"
          fill="hsl(var(--chart-3))"
          fillOpacity={0.15}
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
