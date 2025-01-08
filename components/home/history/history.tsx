import LineWrapper from "@/components/home/charts/line/linewrapper";
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
      description: "rain rate in counts per hour",
      unit: " c/hr",
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
      <div className="flex w-full justify-center flex-wrap gap-2 md:gap-4 py-4">
        {blocks.map((block) => (
          <LineWrapper
            key={block.field}
            field={block.field}
            lookback={lookback}
            lineChartCardConfig={block.lineChartCardConfig}
          />
        ))}
      </div>
    </>
  );
}
