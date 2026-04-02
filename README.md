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

## Build

```bash
bun run build
```

## License

All rights reserved.
