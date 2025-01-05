import Container from "../layout/container/container";
import Title from "../layout/container/title";
import { NWSGridpointForecastResponse } from "@/components/forecast/types";

async function getForecast(
  wfo: string,
  x: string,
  y: string
): Promise<NWSGridpointForecastResponse> {
  const res = await fetch(
    `https://api.weather.gov/gridpoints/${wfo}/${x},${y}/forecast`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status === 200) {
    return res.json() as Promise<NWSGridpointForecastResponse>;
  } else {
    throw new Error("failed to get nws forecast");
  }
}

export default async function ForecastContainer({
  wfo,
  x,
  y,
}: {
  wfo: string;
  x: string;
  y: string;
}) {
  const forecast = await getForecast(wfo, x, y);

  if (
    forecast &&
    forecast.properties &&
    forecast.properties.periods &&
    forecast.properties.periods.length > 0
  ) {
    return (
      <Container>
        <Title title="nws forecast" />

        {forecast.properties.periods.map((period) => (
          <div
            key={period.number}
            className="bg-base border rounded-lg shadow p-4 mb-4"
          >
            <h1 className="text-xl">{period.name}</h1>
            <h2>{period.detailedForecast}</h2>
          </div>
        ))}
      </Container>
    );
  }
}
