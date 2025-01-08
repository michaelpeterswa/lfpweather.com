import AlertsContainer from "@/components/home/alerts/alerts";
import ForecastContainer from "@/components/home/forecast/forecast";
import HistoryContainer from "@/components/home/history/history";
import { CameraCardProps } from "@/components/images/camera/camera";
import CameraContainer from "@/components/images/camera/camera-container";
import CurrentContainer from "../components/home/current/current";

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

export default function Home() {
  return (
    <>
      <AlertsContainer zone="WAZ558" />
      <CurrentContainer />
      <HistoryContainer />
      <ForecastContainer wfo="SEW" x="127" y="75" />
      <CameraContainer title="local cameras" camerasProps={camerasProps} />
    </>
  );
}
