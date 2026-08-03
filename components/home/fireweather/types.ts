// Shape returned by GET /api/v1/fire_danger/summary. The rating is derived
// server-side from the station's own season percentiles.

export type FireDangerRating = {
  class: string; // Low, Moderate, High, Very High, Extreme
  level: number; // 0 (Low) .. 4 (Extreme)
  headline: string;
  detail: string;
};

export type ERCContext = {
  value: number;
  percentile: number; // 0..1
  p50: number;
  p80: number;
  p90: number;
  p97: number;
  max: number;
};

export type BIContext = {
  value: number;
  p90: number;
  p97: number;
};

export type DroughtContext = {
  kbdi: number; // 0..800
  gsi: number; // 0..1
};

export type FuelMoistureContext = {
  dead_1hr: number;
  dead_10hr: number;
  dead_100hr: number;
  dead_1000hr: number;
  live_herbaceous: number;
  live_woody: number;
};

export type ComponentsContext = {
  spread: number;
  ignition: number;
};

export type FireDangerSummary = {
  time: string;
  device_id: string;
  fuel_model: string;
  rating: FireDangerRating;
  energy_release: ERCContext;
  burning_index: BIContext;
  drought: DroughtContext;
  fuel_moisture: FuelMoistureContext;
  components: ComponentsContext;
};

// A single point of the ERC trend, adapted from the /api/v1/query response.
export type ErcPoint = {
  time: string;
  min: number;
  avg: number;
  max: number;
};
