import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { GetPowerBreakdownResponse } from "./types";
import { VBarChartCardConfig, VBarSection } from "../charts/vbar/types";
import { VBarChartCard } from "../charts/vbar/vbar";
import { formatRelative } from "date-fns";
import ElectricityMapsCard from "./card";

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
      const updatedAtLocal = new Date(powerBreakdown.updatedAt);
      const relativeDate = formatRelative(updatedAtLocal, new Date());

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

      let powerImportVBarSections: VBarSection[] = [];
      let powerExportVBarSections: VBarSection[] = [];

      if (powerBreakdown.powerExportBreakdown) {
        powerExportVBarSections = Object.entries(
          powerBreakdown.powerExportBreakdown
        ).map(([key, exportData]) => ({
          label: exportData.zoneName ?? key,
          value: exportData.value ?? 0,
        }));
      } else {
        powerExportVBarSections = [];
      }
      if (powerBreakdown.powerImportBreakdown) {
        powerImportVBarSections = Object.entries(
          powerBreakdown.powerImportBreakdown
        ).map(([key, importData]) => ({
          label: importData.zoneName ?? key,
          value: importData.value ?? 0,
        }));
      } else {
        powerImportVBarSections = [];
      }

      const powerImportVBarConfig: VBarChartCardConfig = {
        title: "Power Import Breakdown",
        description: "Current power import breakdown by zone",
        unit: "MW",
        chartData: powerImportVBarSections,
        footer: `Last updated ${relativeDate}`,
      };
      const powerExportVBarConfig: VBarChartCardConfig = {
        title: "Power Export Breakdown",
        description: "Current power export breakdown by zone",
        unit: "MW",
        chartData: powerExportVBarSections,
        footer: `Last updated ${relativeDate}`,
      };

      return (
        <Container>
          <Title title="power breakdown" />
          <div className="flex w-full justify-center flex-wrap gap-2 md:gap-4 py-4">
            <ElectricityMapsCard
              config={{
                title: "Consumption Total",
                value: powerBreakdown.powerConsumptionTotal,
                unit: "MW",
                time: `Last updated ${relativeDate}`,
              }}
            />
            <ElectricityMapsCard
              config={{
                title: "Production Total",
                value: powerBreakdown.powerProductionTotal,
                unit: "MW",
                time: `Last updated ${relativeDate}`,
              }}
            />
            <ElectricityMapsCard
              config={{
                title: "Import Total",
                value: powerBreakdown.powerImportTotal,
                unit: "MW",
                time: `Last updated ${relativeDate}`,
              }}
            />
            <ElectricityMapsCard
              config={{
                title: "Export Total",
                value: powerBreakdown.powerExportTotal,
                unit: "MW",
                time: `Last updated ${relativeDate}`,
              }}
            />
            <ElectricityMapsCard
              config={{
                title: "Fossil Free Percentage",
                value: powerBreakdown.fossilFreePercentage,
                unit: "%",
                time: `Last updated ${relativeDate}`,
              }}
            />
            <ElectricityMapsCard
              config={{
                title: "Renewable Percentage",
                value: powerBreakdown.renewablePercentage,
                unit: "%",
                time: `Last updated ${relativeDate}`,
              }}
            />
          </div>
          <div className="flex w-full justify-center flex-wrap gap-2 md:gap-4 py-4">
            <VBarChartCard config={consumptionVBarConfig} />
            <VBarChartCard config={productionVBarConfig} />
            <VBarChartCard config={powerImportVBarConfig} />
            <VBarChartCard config={powerExportVBarConfig} />
          </div>
        </Container>
      );
    }
  }
}
