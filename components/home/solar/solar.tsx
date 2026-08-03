import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { LineChartCardConfig } from "@/components/home/charts/line/types";
import QueryLineWrapper from "./query-line-wrapper";
import SolarLatestCard, { SolarLatestCardProps } from "./query-latest-card";

// Sources, and why they are what they are.
//
// Solar comes from the Victron MPPT. It used to come from a Renogy controller,
// which was replaced and stopped writing on 2026-07-26, so those tiles and
// charts had been showing week-old numbers with nothing to say they were old.
//
// Everything about the pack comes from the SmartShunt, the only device that
// measures the pack as a whole. The batteries report themselves too, but there
// are two of them wired in series and a gauge query averages every row in a
// bucket: litime.total_voltage returned about 13.1 V for a pack sitting at
// 26.0 V. Cell temperature is the exception and still comes from the batteries,
// because the shunt does not measure it.

// Current-value tiles: the at-a-glance state of the off-grid power system.
const latestCards: SolarLatestCardProps[] = [
  { metric: "battery_soc", title: "Battery SoC", unit: "%" },
  { metric: "pack_voltage", title: "Pack Voltage", unit: "V" },
  { metric: "solar_power", title: "Solar Power", unit: "W" },
  { metric: "battery_current", title: "Battery Current", unit: "A" },
];

// 7-day trend charts. metric is a friendly alias where one exists, or the
// "table.column" reference the query endpoint accepts for anything else.
const chartBlocks: { metric: string; config: LineChartCardConfig }[] = [
  {
    metric: "battery_soc",
    config: {
      title: "Battery State of Charge",
      description: "battery charge level in percent",
      unit: "%",
    },
  },
  {
    metric: "pack_voltage",
    config: {
      title: "Pack Voltage",
      description: "voltage across the whole pack, measured at the shunt",
      unit: " V",
    },
  },
  {
    metric: "battery_current",
    config: {
      title: "Battery Current",
      description:
        "current in and out of the pack (positive charging, negative discharging)",
      unit: " A",
    },
  },
  {
    metric: "litime.cell_temp",
    config: {
      title: "Battery Temperature",
      description: "battery cell temperature in degrees celsius",
      unit: "°C",
    },
  },
  {
    metric: "solar_power",
    config: {
      title: "Solar Charging Power",
      description: "solar power into the battery in watts",
      unit: " W",
    },
  },
  {
    // Replaces the old panel-voltage chart. The Victron charger reports yield
    // rather than panel voltage, and yield is the more useful number anyway.
    metric: "solar_yield_today",
    config: {
      title: "Solar Yield Today",
      description: "energy harvested so far today, resetting each morning",
      unit: " Wh",
    },
  },
];

export default function SolarContainer() {
  return (
    <Container>
      <Title title="solar & batteries" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {latestCards.map((card, i) => (
          <SolarLatestCard key={i} props={card} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chartBlocks.map((block) => (
          <QueryLineWrapper
            key={block.metric}
            metric={block.metric}
            range="7d"
            lineChartCardConfig={block.config}
          />
        ))}
      </div>
    </Container>
  );
}
