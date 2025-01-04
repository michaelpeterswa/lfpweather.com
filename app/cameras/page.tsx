import { CameraCardProps } from "@/components/images/camera/camera";
import CameraContainer from "@/components/images/camera/camera-container";

const camerasProps: CameraCardProps[] = [
  {
    id: 1,
    title: "Shorecrest High School",
    description: "Camera looking east towards Cascade Mountains",
    url: "https://images.lfpweather.com/weatherbug/scrape/shorecrest.png",
  },
  {
    id: 2,
    title: "Open Window School",
    description: "Camera looking northwest towards Lake Washington",
    url: "https://images.lfpweather.com/weatherbug/scrape/openwindowschool.png",
  },
  {
    id: 3,
    title: "Overlake School",
    description: "Camera looking west towards Lake Washington",
    url: "https://images.lfpweather.com/weatherbug/scrape/overlakeschool.png",
  },
  {
    id: 4,
    title: "Lake Forest Park",
    description: "Camera looking at the SR-522 and SR-104 intersection",
    url: "https://images.lfpweather.com/wsdot/api/lakeforestpark.png",
  },
  {
    id: 5,
    title: "Kenmore",
    description: "Camera looking at SR-522 near 61st Ave NE",
    url: "https://images.lfpweather.com/wsdot/api/kenmore.png",
  },
  {
    id: 6,
    title: "Bothell",
    description: "Camera looking at SR-522, near Campus Way",
    url: "https://images.lfpweather.com/wsdot/api/bothell.png",
  },
  {
    id: 7,
    title: "Woodinville",
    description: "Camera looking at the SR-522 and SR-202 intersection",
    url: "https://images.lfpweather.com/wsdot/api/woodinville.png",
  },
  {
    id: 8,
    title: "Sun Mountain Lodge",
    description: "Camera looking at the Methow Valley",
    url: "https://images.lfpweather.com/sunmountainlodge/scrape/sunmountain.png",
  },
  {
    id: 9,
    title: "Mazama Ranch House",
    description: "Camera looking at the out at the ski trails",
    url: "https://images.lfpweather.com/direct/direct/mazama.png",
  },
  {
    id: 10,
    title: "Winthrop",
    description: "Camera looking at the Methow Valley",
    url: "https://images.lfpweather.com/direct/direct/winthrop.png",
  },
];

export default function Cameras() {
  return <CameraContainer title="Camera Views" camerasProps={camerasProps} />;
}
