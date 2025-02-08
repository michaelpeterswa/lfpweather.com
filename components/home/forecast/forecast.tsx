import { Separator } from "@/components/ui/separator";
import Container from "../../layout/container/container";
import Title from "../../layout/container/title";
import { DetailedForecastResponse } from "@/components/home/forecast/types";
import WeatherIcon from "@/components/weather/icons";

export default async function ForecastContainer() {
  const res = await fetch(
    `${
      process.env.FORECAST_INFERENCE_API_BASE_URL ?? ""
    }/api/v1/forecast/detailed`,
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
      <Container isAlert>
        <Title title="forecast" />
        <div className="border-red-500 bg-red-50 dark:bg-red-950 border rounded-lg shadow p-4 mb-4 flex justify-center">
          <h1>failed to get forecast</h1>
        </div>
      </Container>
    );
  } else {
    const forecast = (await res.json()) as DetailedForecastResponse;

    if (forecast && forecast.periods && forecast.periods.length > 0) {
      return (
        <Container>
          <Title title="nws forecast" />
          <div className="flex flex-col justify-center items-center">
            {forecast.periods.map((period) => (
              <div
                key={period.name}
                className="bg-base border rounded-lg shadow p-4 mb-4 w-11/12"
              >
                <h1 className="text-xl text-muted-foreground">{period.name}</h1>
                <Separator className="mt-3 mb-2" />
                <div className="flex flex-row items-center">
                  <div className="px-4">
                    <WeatherIcon icon={period.icon} className="h-8 w-8" />
                  </div>
                  <div className="flex flex-col grow space-y-1">
                    <h3>{period.short_forecast}</h3>
                    <h3>
                      {period.time_of_day == "day" ? "High:" : "Low:"}{" "}
                      {period.temperature}°F
                    </h3>
                    <h3>
                      {period.wind_speed} {period.wind_direction} -&nbsp;
                      {period.beaufort.toLowerCase()}
                    </h3>
                  </div>
                </div>
                <Separator className="mt-3 mb-2" />
                <h2 className="">{period.detailed_forecast}</h2>
              </div>
            ))}
          </div>
        </Container>
      );
    }
  }
}
