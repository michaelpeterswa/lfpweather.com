/**
 * Single source of truth for home page sections and their feature flags.
 *
 * Sections are disabled with the server-side env var DISABLED_SECTIONS, a
 * comma-separated list of keys. Unset or empty means everything renders.
 * The helpers read process.env at call time and must only run on the server;
 * client components should receive the result as a prop.
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
  { key: "heat-stress", navTitle: "heat", href: "#heat-stress", category: "seasonal-warm" },
  { key: "7-day-history", navTitle: "7d", href: "#7-day-history", category: "core" },
  { key: "fire-weather", navTitle: "fire", href: "#fire-weather", category: "seasonal-warm" },
  { key: "degree-days", navTitle: "gdd", href: "#degree-days", category: "seasonal-growing" },
  { key: "evapotranspiration", navTitle: "et", href: "#evapotranspiration", category: "seasonal-growing" },
  { key: "birdnet-24h", navTitle: "birds", href: "#birdnet-24h", category: "extras" },
  { key: "seismology", navTitle: "seismic", href: "#seismology", category: "extras" },
  { key: "solar-batteries", navTitle: "solar", href: "#solar-batteries", category: "extras" },
  { key: "forecast-images", navTitle: "images", href: "#forecast-images", category: "extras" },
  { key: "nws-forecast", navTitle: "forecast", href: "#nws-forecast", category: "core" },
  { key: "local-cameras", navTitle: "cameras", href: "#local-cameras", category: "extras" },
  { key: "power-breakdown", navTitle: "power", href: "#power-breakdown", category: "extras" },
  // The "at a glance" container; its real anchor is #at-aglance.
  { key: "ai-insights", href: "#at-aglance", category: "extras" },
  // Sub-flag: hides only the fire weather card inside AI Insights.
  { key: "ai-insights-fire", category: "extras" },
];

export const SECTION_KEYS: ReadonlySet<string> = new Set(
  SECTIONS.map((s) => s.key)
);

const warnedUnknown = new Set<string>();

export function getDisabledSections(): Set<string> {
  const disabled = new Set<string>();
  const raw = process.env.DISABLED_SECTIONS;
  if (!raw) return disabled;

  for (const part of raw.split(",")) {
    const key = part.trim().toLowerCase();
    if (!key) continue;
    if (!SECTION_KEYS.has(key)) {
      if (!warnedUnknown.has(key)) {
        warnedUnknown.add(key);
        console.warn(
          `[sections] ignoring unknown key in DISABLED_SECTIONS: "${key}"`
        );
      }
      continue;
    }
    disabled.add(key);
  }
  return disabled;
}

export function isSectionEnabled(key: string): boolean {
  return !getDisabledSections().has(key);
}
