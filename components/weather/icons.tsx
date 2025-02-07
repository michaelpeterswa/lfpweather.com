import { cn } from "@/lib/utils";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudMoon,
  CloudMoonRain,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  CloudSunRain,
  Cloudy,
  ShieldQuestion,
  Snowflake,
  Sun,
  SunSnow,
  ThermometerSnowflake,
  ThermometerSun,
  Wind,
} from "lucide-react";

const lucideWeatherIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  cloud: Cloud,
  "cloud-drizzle": CloudDrizzle,
  "cloud-fog": CloudFog,
  "cloud-hail": CloudHail,
  "cloud-lightning": CloudLightning,
  "cloud-moon": CloudMoon,
  "cloud-moon-rain": CloudMoonRain,
  "cloud-rain": CloudRain,
  "cloud-rain-wind": CloudRainWind,
  "cloud-snow": CloudSnow,
  "cloud-sun": CloudSun,
  "cloud-sun-rain": CloudSunRain,
  cloudy: Cloudy,
  snowflake: Snowflake,
  sun: Sun,
  "sun-snow": SunSnow,
  "thermometer-snowflake": ThermometerSnowflake,
  "thermometer-sun": ThermometerSun,
  wind: Wind,
};

export default function WeatherIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const Icon = lucideWeatherIconMap[icon] || ShieldQuestion;

  return <Icon className={cn("w-8 h-8", className)} />;
}
