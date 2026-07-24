import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { LineChartCardConfig } from "@/components/home/charts/line/types";
import QueryLineWrapper from "./query-line-wrapper";
import SolarLatestCard, { SolarLatestCardProps } from "./query-latest-card";

// Current-value tiles: the at-a-glance state of the off-grid power system.
const latestCards: SolarLatestCardProps[] = [
  { metric: "litime.soc", title: "Battery SoC", unit: "%" },
  { metric: "litime.total_voltage", title: "Pack Voltage", unit: "V" },
  { metric: "renogychargecontroller.charging_power", title: "Solar Power", unit: "W" },
  { metric: "litime.current", title: "Battery Current", unit: "A" },
];

// 7-day trend charts. metric uses the table.column reference the query endpoint
// accepts for columns without a friendly alias.
const chartBlocks: { metric: string; config: LineChartCardConfig }[] = [
  {
    metric: "litime.soc",
    config: {
      title: "Battery State of Charge",
      description: "battery charge level in percent",
      unit: "%",
    },
  },
  {
    metric: "litime.total_voltage",
    config: {
      title: "Pack Voltage",
      description: "battery pack voltage in volts",
      unit: " V",
    },
  },
  {
    metric: "litime.current",
    config: {
      title: "Battery Current",
      description: "battery current in amps (positive charging, negative discharging)",
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
    metric: "renogychargecontroller.charging_power",
    config: {
      title: "Solar Charging Power",
      description: "solar power into the battery in watts",
      unit: " W",
    },
  },
  {
    metric: "renogychargecontroller.solar_panel_voltage",
    config: {
      title: "Solar Panel Voltage",
      description: "solar panel voltage in volts",
      unit: " V",
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
