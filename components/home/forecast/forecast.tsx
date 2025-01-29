import { Separator } from "@/components/ui/separator";
import Container from "../../layout/container/container";
import Title from "../../layout/container/title";
import { NWSGridpointForecastResponse } from "@/components/home/forecast/types";

export default async function ForecastContainer({
  wfo,
  x,
  y,
}: {
  wfo: string;
  x: string;
  y: string;
}) {
  const res = await fetch(
    `https://api.weather.gov/gridpoints/${wfo}/${x},${y}/forecast`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status !== 200) {
    return (
      <Container>
        <Title title="nws forecast" />
        <div className="bg-red-50 border-red-500 border rounded-lg shadow p-4 mb-4 flex justify-center">
          <h1>failed to get nws forecast</h1>
        </div>
      </Container>
    );
  } else {
    const forecast = (await res.json()) as NWSGridpointForecastResponse;

    if (
      forecast &&
      forecast.properties &&
      forecast.properties.periods &&
      forecast.properties.periods.length > 0
    ) {
      return (
        <Container>
          <Title title="nws forecast" />
          <div className="flex flex-col justify-center items-center">
            {forecast.properties.periods.map((period) => (
              <div
                key={period.number}
                className="bg-base border rounded-lg shadow p-4 mb-4 w-11/12"
              >
                <h1 className="text-xl">{period.name}</h1>
                <Separator className="mt-3 mb-2" />
                <h2>{period.detailedForecast}</h2>
              </div>
            ))}
          </div>
        </Container>
      );
    }
  }
}
