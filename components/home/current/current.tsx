import { Suspense } from "react";
import Container from "../../layout/container/container";
import Title from "../../layout/container/title";
import CurrentCard, { CurrentCardProps } from "./current-card";
import CurrentCardSuspense from "./current-card-suspense";

const currentCards: CurrentCardProps[] = [
  {
    field: "temperature",
    title: "Temperature",
    unit: "°F",
  },
  {
    field: "humidity",
    title: "Humidity",
    unit: "%",
  },
  {
    field: "pressure",
    title: "Pressure",
    unit: "inHg",
  },
  {
    field: "solar_radiation",
    title: "Solar Radiation",
    unit: "W/m²",
  },
  {
    field: "wind_speed",
    title: "Wind Speed",
    unit: "mph",
  },
  {
    field: "24h_rain",
    title: "24 Hour Rain Totals",
    transform: (n: number) => n / 100,
    unit: "in",
  },
  {
    field: "uv_index",
    title: "UV Index",
    unit: "",
  },
];

export default function CurrentContainer() {
  return (
    <Container>
      <Title title="current conditions" />
      <div className="flex w-full justify-center flex-wrap gap-2 md:gap-4 py-4">
        {currentCards.map((card, i) => (
          <Suspense key={i} fallback={<CurrentCardSuspense />}>
            <CurrentCard props={card} />
          </Suspense>
        ))}
      </div>
    </Container>
  );
}
