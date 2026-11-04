import { afterEach, describe, expect, it } from "vitest";
import { formatSiteLong, formatSiteShort } from "@/lib/datetime";

// Every case is a fixed UTC instant plus the string it must produce at the
// station. The exact text is the point: these helpers exist because the same
// instant used to render as UTC on the server (the pod runs with no TZ set) and
// as local in the browser, which is what caused the power-breakdown timestamp
// bug and the charts' hydration mismatch. See lib/datetime.ts.
const SUMMER = new Date(Date.UTC(2026, 6, 31, 3, 30)); // Jul 30, 8:30 PM PDT
const WINTER = new Date(Date.UTC(2026, 0, 15, 20, 0)); // Jan 15, 12:00 PM PST
const MIDNIGHT = new Date(Date.UTC(2026, 6, 31, 7, 0)); // Jul 31, 12:00 AM PDT

describe("formatSiteShort", () => {
  it("formats a summer instant in station time with the zone offset applied", () => {
    expect(formatSiteShort(SUMMER)).toBe("Jul 30, 8:30 PM");
  });

  it("formats the midnight boundary as the following local day", () => {
    expect(formatSiteShort(MIDNIGHT)).toBe("Jul 31, 12:00 AM");
  });

  it("accepts an ISO string as well as a Date", () => {
    expect(formatSiteShort(SUMMER.toISOString())).toBe("Jul 30, 8:30 PM");
  });
});

describe("formatSiteLong", () => {
  it("includes the year and the daylight-saving name", () => {
    expect(formatSiteLong(SUMMER)).toBe("Jul 30, 2026, 8:30 PM PDT");
  });

  it("names standard time in winter", () => {
    expect(formatSiteLong(WINTER)).toBe("Jan 15, 2026, 12:00 PM PST");
  });

  it("keeps the offset correct when the day rolls over", () => {
    expect(formatSiteLong(MIDNIGHT)).toBe("Jul 31, 2026, 12:00 AM PDT");
  });
});

describe("the station timezone wins over the process timezone", () => {
  const original = process.env.TZ;

  afterEach(() => {
    process.env.TZ = original;
  });

  it("renders station time whatever the container's zone is", () => {
    // The regression these helpers guard against: a container whose clock is
    // UTC used to render UTC labels. Nothing here passes a timeZone, so the
    // zone must come from the helpers themselves.
    process.env.TZ = "Etc/UTC";
    expect(formatSiteShort(SUMMER)).toBe("Jul 30, 8:30 PM");
    expect(formatSiteLong(SUMMER)).toBe("Jul 30, 2026, 8:30 PM PDT");

    process.env.TZ = "Pacific/Honolulu";
    expect(formatSiteShort(WINTER)).toBe("Jan 15, 12:00 PM");
  });
});
