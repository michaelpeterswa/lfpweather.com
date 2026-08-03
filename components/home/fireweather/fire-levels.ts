// Maps raw fire indices to a 0..4 danger level and a short label. ERC uses the
// station's own season percentiles (handed down from the summary); KBDI and
// dead fuel moisture use standard NFDRS interpretation bands, which are close
// to absolute; Burning Index uses its season High/Extreme breakpoints.
//
// The class strings below are written out in full so Tailwind keeps them; a
// computed `bg-fire-${level}` would be purged.

export type Level = { level: number; label: string };

// Full class strings, indexed by level 0..4. Do not build these dynamically.
export const FIRE_TEXT = [
  "text-fire-0",
  "text-fire-1",
  "text-fire-2",
  "text-fire-3",
  "text-fire-4",
];
export const FIRE_BG = [
  "bg-fire-0",
  "bg-fire-1",
  "bg-fire-2",
  "bg-fire-3",
  "bg-fire-4",
];
// Left-edge accent color only; the other three sides keep the neutral border.
export const FIRE_BORDER_L = [
  "border-l-fire-0",
  "border-l-fire-1",
  "border-l-fire-2",
  "border-l-fire-3",
  "border-l-fire-4",
];

// kbdiLevel maps the Keetch-Byram Drought Index (0..800) to a drought band.
export function kbdiLevel(kbdi: number): Level {
  if (kbdi < 200) return { level: 0, label: "Low" };
  if (kbdi < 400) return { level: 1, label: "Moderate" };
  if (kbdi < 600) return { level: 2, label: "High" };
  if (kbdi < 700) return { level: 3, label: "Very high" };
  return { level: 4, label: "Severe" };
}

// dead10hrLevel maps 10-hour dead fuel moisture (%) to a dryness band. Lower
// moisture is more dangerous, so the level rises as the value falls.
export function dead10hrLevel(pct: number): Level {
  if (pct > 20) return { level: 0, label: "Moist" };
  if (pct > 14) return { level: 1, label: "Moderate" };
  if (pct > 10) return { level: 2, label: "Dry" };
  if (pct > 7) return { level: 3, label: "Very dry" };
  return { level: 4, label: "Critical" };
}

// biLevel maps the Burning Index to a level using its season breakpoints. Below
// the 90th percentile it is not elevated, so it stays neutral (level 0/1).
export function biLevel(value: number, p90: number, p97: number): Level {
  if (value >= p97) return { level: 4, label: "Extreme" };
  if (value >= p90) return { level: 3, label: "High" };
  if (value >= p90 * 0.6) return { level: 2, label: "Elevated" };
  if (value >= p90 * 0.3) return { level: 1, label: "Moderate" };
  return { level: 0, label: "Low" };
}
