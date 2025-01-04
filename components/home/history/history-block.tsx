import LineWrapper from "@/components/charts/line/linewrapper";
import { LineChartCardConfig } from "@/components/charts/line/types";
import Title from "@/components/layout/container/title";

const blocks: blockProps[] = [
  {
    field: "temperature",
    lineChartCardConfig: {
      title: "Temperature",
      description: "current temperature in fahrenheit",
      unit: "°F",
    },
  },
  {
    field: "humidity",
    lineChartCardConfig: {
      title: "Humidity",
      description: "current humidity in percent",
      unit: "%",
    },
  },
  {
    field: "pressure",
    lineChartCardConfig: {
      title: "Pressure",
      description: "current pressure in inches of mercury",
      unit: " inHg",
    },
  },
  {
    field: "solar_radiation",
    lineChartCardConfig: {
      title: "Solar Radiation",
      description: "current solar radiation in watts per square meter",
      unit: " W/m²",
    },
  },
];

type blockProps = {
  field: string;
  lineChartCardConfig: LineChartCardConfig;
};

export default function HistoryBlock({
  title,
  lookback,
}: {
  title: string;
  lookback: string;
}) {
  return (
    <>
      <Title title={title} />
      <div className="flex justify-center flex-wrap gap-2 md:gap-4 py-4">
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
