import { Suspense } from "react";
import LineWrapper from "@/components/home/charts/line/linewrapper";
import LineChartCardSuspense from "@/components/home/charts/line/line-suspense";
import { LineChartCardConfig } from "@/components/home/charts/line/types";
import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";

const blocks: blockProps[] = [
  {
    field: "temperature",
    lineChartCardConfig: {
      title: "Temperature",
      description: "temperature in fahrenheit",
      unit: "°F",
    },
  },
  {
    field: "humidity",
    lineChartCardConfig: {
      title: "Humidity",
      description: "humidity in percent",
      unit: "%",
    },
  },
  {
    field: "pressure",
    lineChartCardConfig: {
      title: "Pressure",
      description: "pressure in inches of mercury",
      unit: " inHg",
    },
  },
  {
    field: "solar_radiation",
    lineChartCardConfig: {
      title: "Solar Radiation",
      description: "solar radiation in watts per square meter",
      unit: " W/m²",
    },
  },
  {
    field: "uv_index",
    lineChartCardConfig: {
      title: "UV Index",
      description: "uv index",
      unit: "",
    },
  },
  {
    field: "wind_speed",
    lineChartCardConfig: {
      title: "Wind Speed",
      description: "wind speed in miles per hour",
      unit: " mph",
    },
  },
  {
    field: "rain_rate",
    lineChartCardConfig: {
      title: "Rain Rate",
      description: "rain rate in inches per hour",
      unit: " in/hr",
      // The station reports bucket tips of 0.01 in.
      scale: 0.01,
    },
  },
  {
    field: "aqi",
    lineChartCardConfig: {
      title: "Air Quality Index",
      description: "air quality index",
      unit: "",
    },
  },
  {
    field: "co2",
    lineChartCardConfig: {
      title: "CO2 Concentration",
      description: "co2 concentration in parts per million",
      unit: " ppm",
    },
  },
  {
    field: "tvoc_index",
    lineChartCardConfig: {
      title: "TVOC Index",
      description: "tvoc index",
      unit: "",
    },
  },
  {
    field: "nox_index",
    lineChartCardConfig: {
      title: "NOx Index",
      description: "nox index",
      unit: "",
    },
  },
];

type blockProps = {
  field: string;
  lineChartCardConfig: LineChartCardConfig;
};

export default function HistoryContainer() {
  return (
    <Container>
      <HistoryBlock title="7-day history" lookback="7d" />
    </Container>
  );
}

function HistoryBlock({
  title,
  lookback,
}: {
  title: string;
  lookback: string;
}) {
  return (
    <>
      <Title title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blocks.map((block) => (
          <Suspense
            key={block.field}
            fallback={<LineChartCardSuspense config={block.lineChartCardConfig} />}
          >
            <LineWrapper
              field={block.field}
              lookback={lookback}
              lineChartCardConfig={block.lineChartCardConfig}
            />
          </Suspense>
        ))}
      </div>
    </>
  );
}
