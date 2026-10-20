"use client";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatSiteShort } from "@/lib/datetime";
import { ChartPoint } from "./types";

const chartConfig = {
  median: { label: "forecast", color: "hsl(var(--chart-1))" },
  band: { label: "10–90% range", color: "hsl(var(--chart-2))" },
  nws: { label: "NWS", color: "hsl(var(--chart-3))" },
  observed: { label: "observed", color: "hsl(var(--muted-foreground))" },
} satisfies ChartConfig;

// ForecastChart plots recent observations, the Timestral median with its
// 10-90% band, and the NWS hourly forecast on a shared time axis.
export function ForecastChart({ data }: { data: ChartPoint[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full">
      <ComposedChart data={data} margin={{ left: 12, right: 12, top: 12 }}>
        <CartesianGrid vertical={false} strokeOpacity={0.3} />
        <YAxis
          domain={["auto", "auto"]}
          tickCount={5}
          width={40}
          unit="°"
          tickFormatter={(v: number) => Math.round(v).toString()}
        />
        <XAxis
          dataKey="time"
          tickLine={true}
          axisLine={true}
          minTickGap={48}
          tickFormatter={formatSiteShort}
        />
        <ChartTooltip
          cursor={true}
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.time
                  ? formatSiteShort(payload[0].payload.time)
                  : ""
              }
              formatter={(value, name, item) => {
                const text = Array.isArray(value)
                  ? `${Math.round(Number(value[0]))}–${Math.round(Number(value[1]))}°F`
                  : `${Number(value).toFixed(1)}°F`;
                return (
                  <>
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex flex-1 items-center justify-between leading-none gap-4">
                      <span className="text-muted-foreground">{name}</span>
                      <span className="font-mono font-medium tabular-nums text-foreground">
                        {text}
                      </span>
                    </div>
                  </>
                );
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="band"
          name="10–90%"
          type="monotone"
          stroke="none"
          fill="hsl(var(--chart-2))"
          fillOpacity={0.15}
          activeDot={false}
          isAnimationActive={false}
        />
        <Line
          dataKey="observed"
          name="observed"
          type="monotone"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={2}
          dot={false}
          connectNulls
        />
        <Line
          dataKey="nws"
          name="NWS"
          type="monotone"
          stroke="hsl(var(--chart-3))"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          dot={false}
          connectNulls
        />
        <Line
          dataKey="median"
          name="forecast"
          type="monotone"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={false}
          connectNulls
        />
      </ComposedChart>
    </ChartContainer>
  );
}
