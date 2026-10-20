// Mirrors GET /api/v1/temperature_forecast/latest. Temperatures are °F.
export type ForecastPoint = {
  valid_at: string;
  lead_hours: number;
  median: number;
  p10?: number;
  p90?: number;
};

export type TemperaturePoint = {
  time: string;
  temperature: number;
};

export type TemperatureForecast = {
  issued_at: string;
  source: string;
  model: string;
  forecast: ForecastPoint[];
  nws: TemperaturePoint[];
  observed: TemperaturePoint[];
};

export type ChartPoint = {
  time: string;
  observed?: number;
  median?: number;
  band?: [number, number];
  nws?: number;
};

// toChartPoints merges the observed history, the forecast hours and the NWS
// series by timestamp into one time-ordered series for the chart.
export function toChartPoints(f: TemperatureForecast): ChartPoint[] {
  const byTime = new Map<string, ChartPoint>();
  const at = (time: string): ChartPoint => {
    let p = byTime.get(time);
    if (!p) {
      p = { time };
      byTime.set(time, p);
    }
    return p;
  };

  for (const o of f.observed ?? []) at(o.time).observed = o.temperature;
  for (const p of f.forecast ?? []) {
    const c = at(p.valid_at);
    c.median = p.median;
    if (p.p10 !== undefined && p.p90 !== undefined) c.band = [p.p10, p.p90];
  }
  for (const n of f.nws ?? []) at(n.time).nws = n.temperature;

  return [...byTime.values()].sort(
    (a, b) => Date.parse(a.time) - Date.parse(b.time)
  );
}
