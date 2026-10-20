# lfpweather.com

Hyperlocal weather dashboard for Lake Forest Park, Washington. Real-time observations, air quality, bird detection, seismology, and power grid data — all from a single residential observation site.

## Station Hardware

- **Davis Vantage Pro 2 Plus** — temperature, humidity, pressure, wind, rain, solar radiation, UV
- **AirGradient Outdoor** — AQI, CO2, TVOC, NOx
- **Solar-Powered BirdNET-Pi** — 24/7 bird species identification via audio analysis

## Data Pipeline

Sensor data is collected by Go applications and stored in **TimescaleDB**. A Go API serves the data to this frontend. External integrations include NWS forecasts/alerts, ElectricityMaps, and RaspberryShake seismic data.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router, React 19, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (New York style)
- [recharts](https://recharts.org/) for data visualization
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode

## Development

```bash
bun install
bun run dev
```

## Section feature flags

Home page sections can be turned off with the server-side env var
`DISABLED_SECTIONS`, a comma-separated list of keys (whitespace is trimmed,
matching is case-insensitive, empty entries are ignored). Unknown keys are
ignored with a one-time warning in the server log. Unset or empty renders
everything. A disabled section is not rendered, fetched, or linked in the
section navigation. The value is read per request, so changing it needs only a
restart, not a rebuild.

```bash
DISABLED_SECTIONS=heat-stress,fire-weather,degree-days,evapotranspiration
```

Keys (defined in `lib/sections.ts`, matching each section's anchor id):

- core: `nws-alerts`, `current-conditions`, `ai-forecast`, `station-forecast`, `7-day-history`, `nws-forecast`
- seasonal-warm: `heat-stress`, `fire-weather`
- seasonal-growing: `degree-days`, `evapotranspiration`
- extras: `ai-insights` (the "at a glance" card), `birdnet-24h`, `seismology`, `solar-batteries`, `forecast-images`, `local-cameras`, `power-breakdown`
- sub-flag: `ai-insights-fire` hides only the fire weather entry inside AI Insights

If only one of `birdnet-24h` / `seismology` is disabled the other spans the full
row; if both are disabled the row is omitted.

## Build

```bash
bun run build
```

## License

All rights reserved.
