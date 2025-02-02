import { Separator } from "@/components/ui/separator";
import Container from "../../layout/container/container";
import Title from "../../layout/container/title";
import { AIForecastResponse } from "./types";
import { BrainCircuit } from "lucide-react";
import { formatDistance } from "date-fns";

export default async function AIForecastContainer() {
  const res = await fetch(
    `${
      process.env.FORECAST_INFERENCE_API_BASE_URL ?? ""
    }/api/v1/forecast/summary`,
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
      <Container>
        <Title title="nws forecast" />
        <div className="bg-red-50 border-red-500 border rounded-lg shadow p-4 mb-4 flex justify-center">
          <h1>failed to get nws forecast</h1>
        </div>
      </Container>
    );
  } else {
    const forecast = (await res.json()) as AIForecastResponse;

    if (forecast) {
      const formattedTime = formatDistance(
        Date.parse(forecast.last_updated),
        new Date(),
        {
          addSuffix: true,
        }
      );

      return (
        <Container>
          <Title title="ai forecast" />
          <div className="flex flex-col justify-center items-center">
            <div className="bg-base border rounded-lg shadow p-4 mb-4 w-11/12">
              <div className="pb-2">
                <div className="flex items-center pb-2">
                  <BrainCircuit className="h-5 w-5 lg:h-7 lg:w-7 mr-2" />
                  <h1 className="text-sm lg:text-xl">
                    Two-Day Forecast Summary
                  </h1>
                </div>
                <div className="text-muted-foreground">
                  <h3 className="text-sm">{formattedTime}</h3>
                </div>
              </div>
              <Separator />
              <div className="pt-2">
                <h2>{forecast.summary}</h2>
              </div>
            </div>
          </div>
        </Container>
      );
    }
  }
}
