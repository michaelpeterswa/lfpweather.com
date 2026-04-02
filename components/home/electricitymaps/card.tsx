import { ElectricityMapsCardConfig } from "./types";

export default function ElectricityMapsCard({
  config,
}: {
  config: ElectricityMapsCardConfig;
}) {
  return (
    <div className="rounded-lg border bg-secondary/50 p-3">
      <p className="text-xs text-muted-foreground">{config.title}</p>
      <p className="font-mono-data text-lg font-bold tracking-tight mt-0.5">
        {config.value}
        <span className="text-sm font-normal text-muted-foreground ml-1">{config.unit}</span>
      </p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{config.time}</p>
    </div>
  );
}
