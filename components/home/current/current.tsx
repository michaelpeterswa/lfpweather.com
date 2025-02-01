import Container from "../../layout/container/container";
import Title from "../../layout/container/title";
import CurrentCard from "./current-card";

export default function CurrentContainer() {
  return (
    <Container>
      <Title title="current conditions" />
      <div className="flex w-full justify-center flex-wrap gap-2 md:gap-4 py-4">
        <CurrentCard field="temperature" title="Temperature" unit="°F" />
        <CurrentCard field="humidity" title="Humidity" unit="%" />
        <CurrentCard field="pressure" title="Pressure" unit="inHg" />
        <CurrentCard
          field="solar_radiation"
          title="Solar Radiation"
          unit="W/m²"
        />
        <CurrentCard field="wind_speed" title="Wind Speed" unit="mph" />
        <CurrentCard
          field="24h_rain"
          title="24 Hour Rain Totals"
          transform={(n) => n / 100}
          unit="in"
        />
        <CurrentCard field="uv_index" title="UV Index" unit="" />
      </div>
    </Container>
  );
}
