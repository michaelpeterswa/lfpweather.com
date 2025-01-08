import { formatDistance } from "date-fns";
import { Card } from "../../ui/card";
import { LastResponse } from "./types";

export default async function CurrentCard({
  field,
  unit,
  title,
}: {
  field: string;
  unit: string;
  title: string;
}) {
  const res = await fetch(
    `${process.env.API_BASE_URL ?? ""}/api/v1/${field}/last`,
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
      <Card className="w-11/12 md:w-1/4 border-red-500 bg-red-50">
        <div className="flex flex-col justify-between items-center py-2">
          <h2>{title}</h2>
          <h1 className="text-xl font-semibold">error</h1>
          <h3>failed to get data</h3>
        </div>
      </Card>
    );
  } else {
    const lastData = (await res.json()) as LastResponse;

    const formattedTime = formatDistance(
      Date.parse(lastData.time),
      new Date(),
      {
        addSuffix: true,
      }
    );

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
}
