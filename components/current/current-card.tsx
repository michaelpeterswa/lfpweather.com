import { formatDistance } from "date-fns";
import { Card } from "../ui/card";
import { LastResponse } from "./types";

async function getData(
  baseurl: string,
  apikey: string,
  field: string
): Promise<LastResponse> {
  const res = await fetch(`${baseurl}/api/v1/${field}/last`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apikey,
    },
  });
  if (res.status === 200) {
    return res.json() as Promise<LastResponse>;
  } else {
    throw new Error("failed to get latest data");
  }
}

export default async function CurrentCard({
  field,
  unit,
  title,
}: {
  field: string;
  unit: string;
  title: string;
}) {
  const lastData = await getData(
    process.env.API_BASE_URL ?? "",
    process.env.API_KEY ?? "",
    field
  );

  const formattedTime = formatDistance(Date.parse(lastData.time), new Date(), {
    addSuffix: true,
  });

  return (
    <Card className="w-11/12 md:w-1/4">
      <div className="flex flex-col justify-between items-center py-2">
        <h2>{title}</h2>
        <h1 className="text-xl font-semibold">
          {lastData.last} {unit}
        </h1>
        <h3>{formattedTime}</h3>
      </div>
    </Card>
  );
}
