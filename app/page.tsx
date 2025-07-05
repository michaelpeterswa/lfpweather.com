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
import ForecastContainerSuspense from "@/components/home/forecast/forecast-suspense";
import ElectricityMapsContainer from "@/components/home/electricitymaps/electricitymaps";
import RaspberryShakeContainer from "@/components/home/raspberryshake/raspberryshake";

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
  return (
    <>
      <AlertsContainer zone="WAZ558" />

      <Suspense fallback={<CurrentContainerSuspense />}>
        <CurrentContainer />
      </Suspense>

      <Suspense fallback={<AIForecastContainerSuspense />}>
        <AIForecastContainer />
      </Suspense>

      <HistoryContainer />

      <RaspberryShakeContainer />

      <ElectricityMapsContainer />

      <CameraContainer
        title="forecast images"
        camerasProps={forecastImageProps}
      />

      <Suspense fallback={<ForecastContainerSuspense />}>
        <ForecastContainer />
      </Suspense>

      <CameraContainer title="local cameras" camerasProps={camerasProps} />
    </>
  );
}
