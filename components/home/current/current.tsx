import Container from "../../layout/container/container";
import Title from "../../layout/container/title";
import CurrentCard, { CurrentCardProps } from "./current-card";

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
  {
    field: "aqi",
    title: "Air Quality Index",
    unit: "",
  },
  {
    field: "co2",
    title: "CO2 Concentration",
    unit: "ppm",
  },
  {
    field: "tvoc_index",
    title: "TVOC Index",
    unit: "",
  },
  {
    field: "nox_index",
    title: "NOx Index",
    unit: "",
  },
];

export default function CurrentContainer() {
  return (
    <Container>
      <Title title="current conditions" />
      <div className="flex w-full justify-center flex-wrap gap-2 md:gap-4 py-4">
        {currentCards.map((card, i) => (
          <CurrentCard key={i} props={card} />
        ))}
      </div>
    </Container>
  );
}
