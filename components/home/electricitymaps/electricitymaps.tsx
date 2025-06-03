import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { GetPowerBreakdownResponse } from "./types";
import { VBarChartCardConfig, VBarSection } from "../charts/vbar/types";
import { VBarChartCard } from "../charts/vbar/vbar";
import { formatRelative } from "date-fns";

export default async function ElectricityMapsContainer() {
  const res = await fetch(
    `${
      process.env.API_BASE_URL ?? ""
    }/api/v1/electricitymaps/power_breakdown/latest`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY ?? "",
      },
    }
  );
  if (res.status !== 200) {
    return (
      <Container isAlert>
        <Title title="forecast" />
        <div className="border-red-500 bg-red-50 dark:bg-red-950 border rounded-lg shadow p-4 mb-4 flex justify-center">
          <h1>failed to get forecast</h1>
        </div>
      </Container>
    );
  } else {
    const powerBreakdown = (await res.json()) as GetPowerBreakdownResponse;

    if (powerBreakdown) {
      const relativeDate = formatRelative(
        Date.parse(powerBreakdown.updatedAt),
        new Date()
      );

      const consumptionVBarConfig: VBarChartCardConfig = {
        title: "Power Consumption Breakdown",
        description: "Current power consumption breakdown by source",
        unit: "MW",
        chartData: [
          {
            label: "Solar",
            value: powerBreakdown.powerConsumptionBreakdown.solar,
          },
          {
            label: "Wind",
            value: powerBreakdown.powerConsumptionBreakdown.wind,
          },
          {
            label: "Hydro",
            value: powerBreakdown.powerConsumptionBreakdown.hydro,
          },
          {
            label: "Nuclear",
            value: powerBreakdown.powerConsumptionBreakdown.nuclear,
          },
          {
            label: "Gas",
            value: powerBreakdown.powerConsumptionBreakdown.gas,
          },
          {
            label: "Coal",
            value: powerBreakdown.powerConsumptionBreakdown.coal,
          },
          {
            label: "Biomass",
            value: powerBreakdown.powerConsumptionBreakdown.biomass,
          },
          {
            label: "Geothermal",
            value: powerBreakdown.powerConsumptionBreakdown.geothermal,
          },
          {
            label: "Oil",
            value: powerBreakdown.powerConsumptionBreakdown.oil,
          },
          {
            label: "Hydro Discharge",
            value: powerBreakdown.powerConsumptionBreakdown["hydro discharge"],
          },
          {
            label: "Battery Discharge",
            value:
              powerBreakdown.powerConsumptionBreakdown["battery discharge"],
          },
          {
            label: "Unknown",
            value: powerBreakdown.powerConsumptionBreakdown.unknown,
          },
        ] as VBarSection[],
        footer: `Last updated ${relativeDate}`,
      };

      // production vbar config
      const productionVBarConfig: VBarChartCardConfig = {
        title: "Power Production Breakdown",
        description: "Current power production breakdown by source",
        unit: "MW",
        chartData: [
          {
            label: "Solar",
            value: powerBreakdown.powerProductionBreakdown.solar,
          },
          {
            label: "Wind",
            value: powerBreakdown.powerProductionBreakdown.wind,
          },
          {
            label: "Hydro",
            value: powerBreakdown.powerProductionBreakdown.hydro,
          },
          {
            label: "Nuclear",
            value: powerBreakdown.powerProductionBreakdown.nuclear,
          },
          {
            label: "Gas",
            value: powerBreakdown.powerProductionBreakdown.gas,
          },
          {
            label: "Coal",
            value: powerBreakdown.powerProductionBreakdown.coal,
          },
          {
            label: "Biomass",
            value: powerBreakdown.powerProductionBreakdown.biomass,
          },
          {
            label: "Geothermal",
            value: powerBreakdown.powerProductionBreakdown.geothermal,
          },
          {
            label: "Oil",
            value: powerBreakdown.powerProductionBreakdown.oil,
          },
          {
            label: "Hydro Discharge",
            value: powerBreakdown.powerProductionBreakdown["hydro discharge"],
          },
          {
            label: "Battery Discharge",
            value: powerBreakdown.powerProductionBreakdown["battery discharge"],
          },
          {
            label: "Unknown",
            value: powerBreakdown.powerProductionBreakdown.unknown,
          },
        ] as VBarSection[],
        footer: `Last updated ${relativeDate}`,
      };

      return (
        <Container>
          <Title title="power breakdown" />
          <div className="flex w-full justify-center flex-wrap gap-2 md:gap-4 py-4">
            <VBarChartCard config={consumptionVBarConfig} />
            <VBarChartCard config={productionVBarConfig} />
          </div>
        </Container>
      );
    }
  }
}
