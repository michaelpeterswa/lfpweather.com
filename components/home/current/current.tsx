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
    title: "24h Rain",
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
    title: "AQI",
    unit: "",
  },
  {
    field: "co2",
    title: "CO2",
    unit: "ppm",
  },
  {
    field: "tvoc_index",
    title: "TVOC",
    unit: "",
  },
  {
    field: "nox_index",
    title: "NOx",
    unit: "",
  },
];

export default function CurrentContainer() {
  return (
    <Container>
      <Title title="current conditions" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {currentCards.map((card, i) => (
          <CurrentCard key={i} props={card} />
        ))}
      </div>
    </Container>
  );
}
