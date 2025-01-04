import LineWrapper from "@/components/charts/line/linewrapper";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-4xl text-center w-full">7-day history</h1>
      <div className="flex justify-center flex-wrap gap-2 md:gap-4 py-4">
        <LineWrapper
          field="temperature"
          lookback="7d"
          lineChartCardConfig={{
            title: "Temperature",
            description: "current temperature in fahrenheit",
            unit: "°F",
          }}
        />
        <LineWrapper
          field="humidity"
          lookback="7d"
          lineChartCardConfig={{
            title: "Humidity",
            description: "current humidity in percent",
            unit: "%",
          }}
        />
        <LineWrapper
          field="pressure"
          lookback="7d"
          lineChartCardConfig={{
            title: "Pressure",
            description: "current pressure in inches of mercury",
            unit: " inHg",
          }}
        />
        <LineWrapper
          field="solar_radiation"
          lookback="7d"
          lineChartCardConfig={{
            title: "Solar Radiation",
            description: "current solar radiation in watts per square meter",
            unit: " W/m²",
          }}
        />
      </div>
    </div>
  );
}
