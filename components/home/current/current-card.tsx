import { formatDistance } from "date-fns";
import { LastResponse } from "./types";
import { apiFetch } from "@/lib/api";
import { TileError } from "@/components/layout/error-state";

export type CurrentCardProps = {
  field: string;
  unit: string;
  transform?: (n: number) => number;
  title: string;
};

export default async function CurrentCard({
  props,
}: {
  props: CurrentCardProps;
}) {
  const lastData = await apiFetch<LastResponse>(
    `/api/v1/${props.field}/last`
  );
  if (!lastData) {
    return (
      <TileError title={props.title} />
    );
  } else {
    let lastDataLast = lastData.last;

    if (props.transform) {
      lastDataLast = props.transform(lastDataLast);
    }

    const formattedTime = formatDistance(
      Date.parse(lastData.time),
      new Date(),
      {
        addSuffix: true,
      }
    );

    return (
      <div className="rounded-lg border bg-secondary/50 p-3 hover:bg-secondary/80 transition-colors">
        <p className="text-xs text-muted-foreground truncate">{props.title}</p>
        <p className="font-mono-data text-xl font-bold tracking-tight mt-0.5">
          {lastDataLast}
          <span className="text-sm font-normal text-muted-foreground ml-1">{props.unit}</span>
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{formattedTime}</p>
      </div>
    );
  }
}
