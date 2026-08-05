// Shapes returned by GET /api/v1/records/{period} and the presentation metadata
// the frontend layers on top. The API returns metric keys, values, and times;
// the label and unit for each metric live here.

export type RecordExtreme = {
  value: number;
  time: string; // RFC3339
};

export type MetricRecord = {
  metric: string;
  high?: RecordExtreme;
  low?: RecordExtreme;
};

export type RecordsResponse = {
  period: string;
  start: string; // RFC3339
  end: string; // RFC3339
  complete: boolean;
  records: MetricRecord[];
};

// METRIC_META maps a metric key to its display label and unit. Units match the
// station description on the about page.
export const METRIC_META: Record<string, { label: string; unit: string }> = {
  temperature: { label: "Temperature", unit: "°F" },
  humidity: { label: "Humidity", unit: "%" },
  pressure: { label: "Pressure", unit: "inHg" },
  wind_gust: { label: "Wind Gust", unit: "mph" },
  rain_rate: { label: "Rain Rate", unit: "counts/hr" },
  rain_24h: { label: "24h Rain", unit: "in" },
  solar_radiation: { label: "Solar Radiation", unit: "W/m²" },
  uv_index: { label: "UV Index", unit: "" },
  erc: { label: "Energy Release (ERC)", unit: "" },
  burning_index: { label: "Burning Index", unit: "" },
};

// CURRENT_LABEL names each in-progress period on the overview.
export const CURRENT_LABEL: Record<string, string> = {
  day: "Today",
  week: "This Week",
  month: "This Month",
  year: "This Year",
  all: "All-Time",
};

export const RECORD_PERIODS = ["day", "week", "month", "year", "all"] as const;
export type RecordPeriod = (typeof RECORD_PERIODS)[number];

export function isRecordPeriod(v: string | undefined): v is RecordPeriod {
  return !!v && (RECORD_PERIODS as readonly string[]).includes(v);
}

// fmtValue rounds a reading for display: whole numbers at or above 100, one
// decimal below, so a temperature keeps its tenths but solar radiation does not
// grow a meaningless decimal.
export function fmtValue(v: number): string {
  const rounded = Math.abs(v) >= 100 ? Math.round(v) : Math.round(v * 10) / 10;
  return rounded.toLocaleString();
}

// fmtTime renders an instant at the station timezone. withYear adds the year for
// long periods where the month and day alone are ambiguous.
export function fmtTime(iso: string, withYear: boolean): string {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    ...(withYear ? { year: "numeric" as const } : {}),
    hour: "numeric",
    minute: "2-digit",
  });
}

// browseHeading names a past period from its start and kind.
export function browseHeading(period: RecordPeriod, startISO: string): string {
  const d = new Date(startISO);
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles", ...opts });
  switch (period) {
    case "day":
      return fmt({ month: "long", day: "numeric", year: "numeric" });
    case "week":
      return `Week of ${fmt({ month: "long", day: "numeric", year: "numeric" })}`;
    case "month":
      return fmt({ month: "long", year: "numeric" });
    case "year":
      return fmt({ year: "numeric" });
    case "all":
      return "All-Time";
  }
}
