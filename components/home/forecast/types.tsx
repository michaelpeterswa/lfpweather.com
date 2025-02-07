export interface DetailedForecastResponse {
  periods: Period[];
  last_updated: string;
}

export interface Period {
  name: string;
  time_of_day: string;
  icon: string;
  beaufort: string;
  detailed_forecast: string;
  short_forecast: string;
  start_time: string;
  end_time: string;
  temperature: number;
  wind_speed: string;
  wind_direction: string;
}
