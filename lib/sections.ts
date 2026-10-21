/**
 * Single source of truth for home page sections and their feature flags.
 *
 * Seasonal sections show only during their season (SEASONS, in the station's
 * local calendar). Two server-side env vars override that, each a
 * comma-separated list of keys:
 *
 * - DISABLED_SECTIONS hides a section whatever the season.
 * - ENABLED_SECTIONS shows a seasonal section out of season (an early heat
 *   wave, say). DISABLED_SECTIONS wins if a key is in both.
 *
 * The helpers read process.env and the clock at call time and must only run
 * on the server; client components should receive the result as a prop.
 */

export type SectionCategory =
  | "core"
  | "seasonal-warm"
  | "seasonal-growing"
  | "extras";

export type Section = {
  /** Flag key (matches the section's anchor id where one exists). */
  key: string;
  /** Short label used in the section jump navigation (absent = no nav entry). */
  navTitle?: string;
  /** Anchor href of the section on the home page (absent for sub-flags). */
  href?: string;
  category: SectionCategory;
};

// Order of entries with a navTitle is the order of the jump navigation.
export const SECTIONS: readonly Section[] = [
  { key: "nws-alerts", href: "#nws-alerts", category: "core" },
  { key: "current-conditions", navTitle: "now", href: "#current-conditions", category: "core" },
  { key: "ai-forecast", navTitle: "ai", href: "#ai-forecast", category: "core" },
  { key: "station-forecast", navTitle: "station", href: "#station-forecast", category: "core" },
  { key: "nws-forecast", navTitle: "forecast", href: "#nws-forecast", category: "core" },
  { key: "forecast-images", navTitle: "images", href: "#forecast-images", category: "extras" },
  { key: "heat-stress", navTitle: "heat", href: "#heat-stress", category: "seasonal-warm" },
  { key: "7-day-history", navTitle: "7d", href: "#7-day-history", category: "core" },
  { key: "fire-weather", navTitle: "fire", href: "#fire-weather", category: "seasonal-warm" },
  { key: "degree-days", navTitle: "gdd", href: "#degree-days", category: "seasonal-growing" },
  { key: "evapotranspiration", navTitle: "et", href: "#evapotranspiration", category: "seasonal-growing" },
  { key: "birdnet-24h", navTitle: "birds", href: "#birdnet-24h", category: "extras" },
  { key: "seismology", navTitle: "seismic", href: "#seismology", category: "extras" },
  { key: "solar-batteries", navTitle: "solar", href: "#solar-batteries", category: "extras" },
  { key: "local-cameras", navTitle: "cameras", href: "#local-cameras", category: "extras" },
  { key: "power-breakdown", navTitle: "power", href: "#power-breakdown", category: "extras" },
  // The "at a glance" container; its real anchor is #at-aglance.
  { key: "ai-insights", href: "#at-aglance", category: "extras" },
  // Sub-flag: hides only the fire weather card inside AI Insights. It follows
  // the fire season like the fire weather section does.
  { key: "ai-insights-fire", category: "seasonal-warm" },
];

export const SECTION_KEYS: ReadonlySet<string> = new Set(
  SECTIONS.map((s) => s.key)
);

/** [month, day], 1-based, in the station's local calendar. */
type MonthDay = readonly [number, number];

/**
 * When each seasonal category shows, inclusive at both ends. Warm-season
 * sections (heat stress, fire weather) come back in late spring; growing
 * sections (degree days, evapotranspiration) at green-up. Both go away in
 * mid-October, when the rains return.
 */
export const SEASONS: Partial<
  Record<SectionCategory, { start: MonthDay; end: MonthDay }>
> = {
  "seasonal-warm": { start: [5, 15], end: [10, 15] },
  "seasonal-growing": { start: [3, 15], end: [10, 15] },
};

const STATION_TIME_ZONE = "America/Los_Angeles";

/** Whether `category` is in season on `now`'s date at the station. */
export function inSeason(category: SectionCategory, now: Date = new Date()): boolean {
  const season = SEASONS[category];
  if (!season) return true;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: STATION_TIME_ZONE,
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);

  // Compare as MMDD so the window reads naturally.
  const today = month * 100 + day;
  const start = season.start[0] * 100 + season.start[1];
  const end = season.end[0] * 100 + season.end[1];
  return start <= end
    ? today >= start && today <= end
    : today >= start || today <= end; // a window that spans the new year
}

const warnedUnknown = new Set<string>();

function parseKeys(name: "DISABLED_SECTIONS" | "ENABLED_SECTIONS"): Set<string> {
  const keys = new Set<string>();
  const raw = process.env[name];
  if (!raw) return keys;

  for (const part of raw.split(",")) {
    const key = part.trim().toLowerCase();
    if (!key) continue;
    if (!SECTION_KEYS.has(key)) {
      const warnKey = `${name}:${key}`;
      if (!warnedUnknown.has(warnKey)) {
        warnedUnknown.add(warnKey);
        console.warn(`[sections] ignoring unknown key in ${name}: "${key}"`);
      }
      continue;
    }
    keys.add(key);
  }
  return keys;
}

/** Every section hidden right now: disabled by env, or out of season. */
export function getDisabledSections(now: Date = new Date()): Set<string> {
  const disabled = parseKeys("DISABLED_SECTIONS");
  const enabled = parseKeys("ENABLED_SECTIONS");

  for (const section of SECTIONS) {
    if (!enabled.has(section.key) && !inSeason(section.category, now)) {
      disabled.add(section.key);
    }
  }
  return disabled;
}

export function isSectionEnabled(key: string): boolean {
  return !getDisabledSections().has(key);
}
