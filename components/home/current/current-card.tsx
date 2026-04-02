import { formatDistance } from "date-fns";
import { LastResponse } from "./types";

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
  const res = await fetch(
    `${process.env.API_BASE_URL ?? ""}/api/v1/${props.field}/last`,
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
      <div className="rounded-lg border border-destructive bg-red-50 dark:bg-red-950 p-3">
        <p className="text-xs text-muted-foreground">{props.title}</p>
        <p className="font-mono-data text-sm font-semibold text-destructive">error</p>
      </div>
    );
  } else {
    const lastData = (await res.json()) as LastResponse;
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
