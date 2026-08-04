"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GDDPoint } from "./types";

const chartConfig = {
  desktop: { label: "GDD", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// formatMonthDay turns a "YYYY-MM-DD" local date string into "Aug 4" without
// constructing a Date, so it renders identically on the server and the client
// and is not shifted by a timezone.
function formatMonthDay(iso: string): string {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  return `${MONTHS[parseInt(parts[1], 10) - 1]} ${parseInt(parts[2], 10)}`;
}

// GDDChart draws the accumulated growing degree days rising across the year.
export function GDDChart({ data }: { data: GDDPoint[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-[220px] w-full">
      <AreaChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} strokeOpacity={0.3} />
        <YAxis domain={[0, "auto"]} tickCount={4} width={40} />
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
          stroke="hsl(var(--chart-1))"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.15}
          strokeWidth={2}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
