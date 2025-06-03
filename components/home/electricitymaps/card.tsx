import { Card } from "@/components/ui/card";
import { ElectricityMapsCardConfig } from "./types";

export default function ElectricityMapsCard({
  config,
}: {
  config: ElectricityMapsCardConfig;
}) {
  return (
    <>
      <Card className="w-11/12 md:w-1/4">
        <div className="flex flex-col justify-between items-center py-2">
          <h2 className="text-muted-foreground">{config.title}</h2>
          <h1 className="text-xl font-semibold">
            {config.value} {config.unit}
          </h1>
          <h3 className="text-muted-foreground text-sm">{config.time}</h3>
        </div>
      </Card>
    </>
  );
}
