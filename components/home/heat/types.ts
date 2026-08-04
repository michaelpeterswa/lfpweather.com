// Shape returned by GET /api/v1/wbgt.

export type WBGTReading = {
  time: string;
  wbgt_c: number;
  wbgt_f: number;
  category: string; // Low, Moderate, High, Very high, Extreme
  level: number; // 0 (Low) .. 4 (Extreme)
  globe_c: number;
  natural_wet_bulb_c: number;
  air_c: number;
};
