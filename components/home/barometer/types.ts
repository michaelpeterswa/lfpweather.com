// Shape returned by GET /api/v1/zambretti.

export type ZambrettiForecast = {
  time: string;
  code: string; // A..Z
  text: string;
  trend: string; // rising, steady, falling
  pressure_hpa: number;
  trend_hpa_per_hour: number;
  wind_dir_deg: number;
};
