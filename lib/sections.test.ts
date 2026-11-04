import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  SEASONS,
  SECTIONS,
  getDisabledSections,
  inSeason,
  isSectionEnabled,
} from "@/lib/sections";

/**
 * Noon-ish UTC is the same calendar day in either Pacific offset (PST -8 puts
 * it at 12:00, PDT -7 at 13:00), so a test date built this way cannot slip
 * across midnight into the day the assertion is about.
 */
const stationDay = (year: number, month: number, day: number) =>
  new Date(Date.UTC(year, month - 1, day, 20));

const MAY_14 = stationDay(2026, 5, 14);
const MAY_15 = stationDay(2026, 5, 15);
const MAR_14 = stationDay(2026, 3, 14);
const MAR_15 = stationDay(2026, 3, 15);
const SEPT_1 = stationDay(2026, 9, 1);
const OCT_15 = stationDay(2026, 10, 15);
const OCT_16 = stationDay(2026, 10, 16);
const WINTER = stationDay(2026, 1, 15);

describe("inSeason", () => {
  it("always shows core and extras sections", () => {
    for (const day of [WINTER, MAR_14, MAY_15, SEPT_1, OCT_16]) {
      expect(inSeason("core", day)).toBe(true);
      expect(inSeason("extras", day)).toBe(true);
    }
  });

  it("opens the warm season on May 15 and closes it on October 15", () => {
    expect(inSeason("seasonal-warm", MAY_14)).toBe(false);
    expect(inSeason("seasonal-warm", MAY_15)).toBe(true);
    expect(inSeason("seasonal-warm", SEPT_1)).toBe(true);
    expect(inSeason("seasonal-warm", OCT_15)).toBe(true);
    expect(inSeason("seasonal-warm", OCT_16)).toBe(false);
  });

  it("opens the growing season earlier, at green-up", () => {
    expect(inSeason("seasonal-growing", MAR_14)).toBe(false);
    expect(inSeason("seasonal-growing", MAR_15)).toBe(true);
    expect(inSeason("seasonal-growing", MAY_15)).toBe(true);
    expect(inSeason("seasonal-growing", OCT_15)).toBe(true);
    expect(inSeason("seasonal-growing", OCT_16)).toBe(false);
  });

  it("handles a window that wraps the new year", () => {
    // The start > end branch, which the real calendar does not currently use.
    const original = SEASONS["seasonal-warm"];
    SEASONS["seasonal-warm"] = { start: [11, 1], end: [2, 28] };
    try {
      expect(inSeason("seasonal-warm", stationDay(2026, 11, 2))).toBe(true);
      expect(inSeason("seasonal-warm", stationDay(2026, 2, 28))).toBe(true);
      expect(inSeason("seasonal-warm", stationDay(2026, 2, 29))).toBe(false);
      expect(inSeason("seasonal-warm", stationDay(2026, 5, 15))).toBe(false);
    } finally {
      SEASONS["seasonal-warm"] = original;
    }
  });
});

describe("getDisabledSections", () => {
  const saved = {
    DISABLED: process.env.DISABLED_SECTIONS,
    ENABLED: process.env.ENABLED_SECTIONS,
  };

  beforeEach(() => {
    delete process.env.DISABLED_SECTIONS;
    delete process.env.ENABLED_SECTIONS;
  });

  afterEach(() => {
    process.env.DISABLED_SECTIONS = saved.DISABLED;
    process.env.ENABLED_SECTIONS = saved.ENABLED;
  });

  it("never hides core sections", () => {
    const disabled = getDisabledSections(WINTER);
    for (const section of SECTIONS) {
      if (section.category === "core") {
        expect(disabled.has(section.key), section.key).toBe(false);
      }
    }
  });

  it("hides seasonal sections outside their season, shows them inside it", () => {
    const winter = getDisabledSections(WINTER);
    expect(winter.has("heat-stress")).toBe(true);
    expect(winter.has("fire-weather")).toBe(true);
    expect(winter.has("degree-days")).toBe(true);

    const summer = getDisabledSections(MAY_15);
    expect(summer.has("heat-stress")).toBe(false);
    expect(summer.has("fire-weather")).toBe(false);
    // degree days start in March, so they are still on in May.
    expect(summer.has("degree-days")).toBe(false);
  });

  it("hides the fire-weather entry inside AI Insights with the fire season", () => {
    expect(getDisabledSections(WINTER).has("ai-insights-fire")).toBe(true);
    expect(getDisabledSections(MAY_15).has("ai-insights-fire")).toBe(false);
  });

  it("DISABLED_SECTIONS hides a section whatever the season", () => {
    process.env.DISABLED_SECTIONS = "seismology";
    expect(getDisabledSections(MAY_15).has("seismology")).toBe(true);
    expect(getDisabledSections(MAY_15).has("heat-stress")).toBe(false);
  });

  it("ENABLED_SECTIONS shows a seasonal section out of season", () => {
    process.env.ENABLED_SECTIONS = "heat-stress";
    const disabled = getDisabledSections(WINTER);
    expect(disabled.has("heat-stress")).toBe(false);
    // The rest of the warm season is still off.
    expect(disabled.has("fire-weather")).toBe(true);
  });

  it("DISABLED_SECTIONS wins when a key is listed in both", () => {
    process.env.DISABLED_SECTIONS = "heat-stress";
    process.env.ENABLED_SECTIONS = "heat-stress";
    expect(getDisabledSections(MAY_15).has("heat-stress")).toBe(true);
  });

  it("trims whitespace, ignores case and empty entries, and splits on commas", () => {
    process.env.DISABLED_SECTIONS = " seismology ,, Solar-Batteries,";
    const disabled = getDisabledSections(MAY_15);
    expect(disabled.has("seismology")).toBe(true);
    expect(disabled.has("solar-batteries")).toBe(true);
  });

  it("ignores unknown keys without hiding anything else", () => {
    const warnings = vi.spyOn(console, "warn").mockImplementation(() => {});
    process.env.DISABLED_SECTIONS = "totally-made-up";
    const disabled = getDisabledSections(MAY_15);
    expect(disabled.has("totally-made-up")).toBe(false);
    expect(disabled.has("seismology")).toBe(false);
    expect(warnings).toHaveBeenCalledOnce();
    warnings.mockRestore();
  });

  it("warns once per bad key, not once per request", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const calls = () => warn.mock.calls.length;

    // Asserted as deltas, because the module keeps its one-time warning set
    // alive for the life of the process and may already have seen this key.
    process.env.DISABLED_SECTIONS = "deduped-key";
    getDisabledSections(MAY_15);
    const afterFirst = calls();
    getDisabledSections(MAY_15);
    expect(calls()).toBe(afterFirst);

    process.env.DISABLED_SECTIONS = "brand-new-key";
    getDisabledSections(MAY_15);
    expect(calls()).toBe(afterFirst + 1);
    warn.mockRestore();
  });
});

describe("isSectionEnabled", () => {
  it("follows getDisabledSections for the current date", () => {
    delete process.env.DISABLED_SECTIONS;
    delete process.env.ENABLED_SECTIONS;
    vi.useFakeTimers();
    try {
      vi.setSystemTime(stationDay(2026, 1, 15));
      expect(isSectionEnabled("heat-stress")).toBe(false);
      expect(isSectionEnabled("current-conditions")).toBe(true);
      vi.setSystemTime(stationDay(2026, 7, 1));
      expect(isSectionEnabled("heat-stress")).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("the section list itself", () => {
  it("has a unique key for every section", () => {
    const keys = SECTIONS.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("names every seasonal category that SEASONS actually defines", () => {
    const categories = new Set(SECTIONS.map((s) => s.category));
    for (const category of Object.keys(SEASONS)) {
      expect(categories.has(category as never)).toBe(true);
    }
  });

  it("only puts hrefs on sections that render an anchor on the page", () => {
    const subFlags = SECTIONS.filter((s) => !s.navTitle && !s.href);
    expect(subFlags.map((s) => s.key)).toEqual(["ai-insights-fire"]);
  });
});
