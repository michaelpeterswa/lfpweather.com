import Container from "../../layout/container/container";
import Title from "../../layout/container/title";
import CurrentCard, { CurrentCardProps } from "./current-card";
import QueryLatestCard, { QueryLatestCardProps } from "./query-latest-card";
import WindCard from "./wind-card";

// The station reports rain in tips of a 0.01 in bucket.
const rainInches = (n: number) => n / 100;

// A tile reads from a fixed /last endpoint where one exists, and from the
// structured query endpoint for any other column.
type Tile =
  | { kind: "last"; props: CurrentCardProps }
  | { kind: "query"; props: QueryLatestCardProps }
  | { kind: "wind" };

const tiles: Tile[] = [
  { kind: "last", props: { field: "temperature", title: "Temperature", unit: "°F" } },
  {
    kind: "query",
    // THW: temperature adjusted for humidity and wind, computed by the console.
    props: { metric: "vantagepro2plus.thw_index", title: "Feels Like", unit: "°F", decimals: 1 },
  },
  {
    kind: "query",
    props: { metric: "vantagepro2plus.dew_point", title: "Dew Point", unit: "°F", decimals: 1 },
  },
  { kind: "last", props: { field: "humidity", title: "Humidity", unit: "%" } },
  { kind: "wind" },
  // /wind_speed/last serves the highest speed over the last 10 minutes.
  { kind: "last", props: { field: "wind_speed", title: "Wind Gust", unit: "mph" } },
  { kind: "last", props: { field: "pressure", title: "Pressure", unit: "inHg" } },
  {
    kind: "query",
    props: {
      metric: "vantagepro2plus.rainfall_day",
      title: "Rain Today",
      unit: "in",
      transform: rainInches,
      decimals: 2,
    },
  },
  {
    kind: "last",
    props: { field: "24h_rain", title: "24h Rain", transform: rainInches, unit: "in" },
  },
  { kind: "last", props: { field: "solar_radiation", title: "Solar Radiation", unit: "W/m²" } },
  { kind: "last", props: { field: "uv_index", title: "UV Index", unit: "" } },
  { kind: "last", props: { field: "aqi", title: "AQI", unit: "" } },
  { kind: "last", props: { field: "co2", title: "CO2", unit: "ppm" } },
  { kind: "last", props: { field: "tvoc_index", title: "TVOC", unit: "" } },
  { kind: "last", props: { field: "nox_index", title: "NOx", unit: "" } },
];

export const CURRENT_TILE_COUNT = tiles.length;

export default function CurrentContainer() {
  return (
    <Container>
      <Title title="current conditions" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {tiles.map((tile, i) => {
          switch (tile.kind) {
            case "last":
              return <CurrentCard key={i} props={tile.props} />;
            case "query":
              return <QueryLatestCard key={i} props={tile.props} />;
            case "wind":
              return <WindCard key={i} />;
          }
        })}
      </div>
    </Container>
  );
}
