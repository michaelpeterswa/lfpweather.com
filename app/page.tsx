import AlertsContainer from "@/components/alerts/alerts";
import HistoryBlock from "@/components/home/history/history-block";
import { CameraCardProps } from "@/components/images/camera/camera";
import CameraContainer from "@/components/images/camera/camera-container";
import Container from "@/components/layout/container/container";

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
      <Container>
        <HistoryBlock title="7-day history" lookback="7d" />
      </Container>
      <CameraContainer title="local cameras" camerasProps={camerasProps} />
    </>
  );
}
