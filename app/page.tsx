import AlertsContainer from "@/components/home/alerts/alerts";
import ForecastContainer from "@/components/home/forecast/forecast";
import HistoryContainer from "@/components/home/history/history";
import { CameraCardProps } from "@/components/images/camera/camera";
import CameraContainer from "@/components/images/camera/camera-container";
import CurrentContainer from "../components/home/current/current";
import AIForecastContainer from "@/components/home/ai-forecast/ai-forecast";
import CurrentContainerSuspense from "@/components/home/current/current-container-suspense";
import { Suspense } from "react";
import AIForecastContainerSuspense from "@/components/home/ai-forecast/ai-forecast-suspense";
import AIInsightsContainer from "@/components/home/ai-insights/ai-insights";
import AIInsightsContainerSuspense from "@/components/home/ai-insights/ai-insights-suspense";
import ForecastContainerSuspense from "@/components/home/forecast/forecast-suspense";
import ElectricityMapsContainer from "@/components/home/electricitymaps/electricitymaps";
import RaspberryShakeContainer from "@/components/home/raspberryshake/raspberryshake";
import BirdnetContainer from "@/components/home/birdnet/birdnet";
import SolarContainer from "@/components/home/solar/solar";
import FireWeatherContainer from "@/components/home/fireweather/fireweather";
import FireWeatherContainerSuspense from "@/components/home/fireweather/fireweather-suspense";
import GDDContainer from "@/components/home/gdd/gdd";
import GDDContainerSuspense from "@/components/home/gdd/gdd-suspense";
import ET0Container from "@/components/home/et0/et0";
import ET0ContainerSuspense from "@/components/home/et0/et0-suspense";
import HeatStressContainer from "@/components/home/heat/heat";
import HeatStressContainerSuspense from "@/components/home/heat/heat-suspense";
import TemperatureForecastContainer from "@/components/home/temperature-forecast/temperature-forecast";
import TemperatureForecastContainerSuspense from "@/components/home/temperature-forecast/temperature-forecast-suspense";

import { isSectionEnabled } from "@/lib/sections";

export const dynamic = "force-dynamic";

const camerasProps: CameraCardProps[] = [
  {
    id: 1,
    title: "shorecrest high school",
    description: "camera looking east towards cascade mountains",
    url: "https://images.lfpweather.com/weatherbug/scrape/shorecrest.png",
  },
  {
    id: 2,
    title: "lake forest park",
    description: "camera looking at the SR-522 and SR-104 intersection",
    url: "https://images.lfpweather.com/wsdot/api/lakeforestpark.png",
  },
];

const forecastImageProps: CameraCardProps[] = [
  {
    id: 1,
    title: "katx radar",
    description: "radar image from the katx radar",
    url: "https://radar.weather.gov/ridge/standard/KATX_loop.gif",
  },
  {
    id: 2,
    title: "noaa max temp",
    description: "noaa maximum temperature forecast",
    url: "https://graphical.weather.gov/GraphicalNDFD.php?width=515&timezone=PST&sector=SEW&element=maxt&n=1",
  },
  {
    id: 3,
    title: "goes-18 pnw extent3",
    description: "goes-18 pacific northwest extent3",
    url: "https://cdn.star.nesdis.noaa.gov/GOES18/GLM/SECTOR/pnw/EXTENT3/GOES18-PNW-EXTENT3-600x600.gif",
  },
  {
    id: 4,
    title: "goes-18 pnw sandwich",
    description: "goes-18 pacific northwest sandwich",
    url: "https://cdn.star.nesdis.noaa.gov/GOES18/ABI/SECTOR/pnw/Sandwich/GOES18-PNW-Sandwich-600x600.gif",
  },
];

export default function Home() {
  const on = (key: string) => isSectionEnabled(key);
  const birdnet = on("birdnet-24h");
  const seismology = on("seismology");

  return (
    <div className="space-y-6">
      {/* Alerts - full width */}
      {on("nws-alerts") && <AlertsContainer zone="WAZ313" />}

      {/* Current Conditions - hero grid */}
      {on("current-conditions") && (
        <Suspense fallback={<CurrentContainerSuspense />}>
          <CurrentContainer />
        </Suspense>
      )}

      {/* AI Forecast */}
      {on("ai-forecast") && (
        <Suspense fallback={<AIForecastContainerSuspense />}>
          <AIForecastContainer />
        </Suspense>
      )}

      {/* Station temperature forecast (Timestral) */}
      {on("station-forecast") && (
        <Suspense fallback={<TemperatureForecastContainerSuspense />}>
          <TemperatureForecastContainer />
        </Suspense>
      )}

      {/* AI Insights - current conditions, smoke outlook, fire weather */}
      {on("ai-insights") && (
        <Suspense fallback={<AIInsightsContainerSuspense />}>
          <AIInsightsContainer />
        </Suspense>
      )}

      {/* Heat stress (WBGT) */}
      {on("heat-stress") && (
        <Suspense fallback={<HeatStressContainerSuspense />}>
          <HeatStressContainer />
        </Suspense>
      )}

      {/* 7-Day History Charts */}
      {on("7-day-history") && <HistoryContainer />}

      {/* Fire Weather - danger rating + ERC trend */}
      {on("fire-weather") && (
        <Suspense fallback={<FireWeatherContainerSuspense />}>
          <FireWeatherContainer />
        </Suspense>
      )}

      {/* Growing Degree Days */}
      {on("degree-days") && (
        <Suspense fallback={<GDDContainerSuspense />}>
          <GDDContainer />
        </Suspense>
      )}

      {/* Reference evapotranspiration */}
      {on("evapotranspiration") && (
        <Suspense fallback={<ET0ContainerSuspense />}>
          <ET0Container />
        </Suspense>
      )}

      {/* BirdNET + Seismology side by side (a lone one spans full width) */}
      {(birdnet || seismology) && (
        <div
          className={
            birdnet && seismology
              ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
              : "grid grid-cols-1 gap-6"
          }
        >
          {birdnet && <BirdnetContainer />}
          {seismology && <RaspberryShakeContainer />}
        </div>
      )}

      {/* Solar Power & Batteries */}
      {on("solar-batteries") && <SolarContainer />}

      {/* Forecast Images */}
      {on("forecast-images") && (
        <CameraContainer
          title="forecast images"
          camerasProps={forecastImageProps}
        />
      )}

      {/* NWS Detailed Forecast */}
      {on("nws-forecast") && (
        <Suspense fallback={<ForecastContainerSuspense />}>
          <ForecastContainer />
        </Suspense>
      )}

      {/* Local Cameras */}
      {on("local-cameras") && (
        <CameraContainer title="local cameras" camerasProps={camerasProps} />
      )}

      {/* Power Breakdown */}
      {on("power-breakdown") && <ElectricityMapsContainer />}
    </div>
  );
}
