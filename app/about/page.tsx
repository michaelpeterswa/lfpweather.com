import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Cloud,
  Wind,
  Bird,
  Database,
  Cpu,
  Radio,
} from "lucide-react";

const davisMetrics = [
  { name: "Temperature", unit: "°F", description: "Outdoor air temperature" },
  { name: "Humidity", unit: "%", description: "Relative humidity" },
  { name: "Barometric Pressure", unit: "inHg", description: "Station pressure, adjusted to sea level" },
  { name: "Wind Speed", unit: "mph", description: "Sustained wind speed" },
  { name: "Rain Rate", unit: "counts/hr", description: "Current precipitation intensity" },
  { name: "24-Hour Rain Totals", unit: "in", description: "Cumulative rainfall over the past 24 hours" },
  { name: "Solar Radiation", unit: "W/m\u00B2", description: "Incoming solar irradiance" },
  { name: "UV Index", unit: "index", description: "Ultraviolet radiation intensity" },
];

const airgradientMetrics = [
  { name: "Air Quality Index (AQI)", unit: "index", description: "Composite air quality score based on PM2.5" },
  { name: "CO\u2082 Concentration", unit: "ppm", description: "Ambient carbon dioxide levels" },
  { name: "TVOC Index", unit: "index", description: "Total volatile organic compound levels" },
  { name: "NOx Index", unit: "index", description: "Nitrogen oxide levels" },
];

const birdnetMetrics = [
  { name: "Species Detection Count", unit: "detections/24h", description: "Number of audio detections per species in a rolling 24-hour window" },
];

export default function About() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Container>
        <Title title="about" />
        <p className="text-sm leading-relaxed">
          lfpweather.com provides hyperlocal weather observations, air quality monitoring,
          bird species detection, and environmental data for the Lake Forest Park, Washington area.
          All data is collected from sensors deployed at a single residential observation site
          and served in real-time.
        </p>
      </Container>

      {/* Station Hardware */}
      <Container>
        <Title title="observation site" />
        <p className="text-sm leading-relaxed mb-4">
          The station is built around three primary sensor platforms, each serving a distinct
          role in the observation pipeline.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-secondary/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold">Davis Vantage Pro 2 Plus</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Professional-grade weather station providing core meteorological observations.
              The Plus package includes a solar radiation sensor and UV index sensor in
              addition to the standard temperature, humidity, pressure, wind, and rain suite.
            </p>
          </div>

          <div className="rounded-lg border bg-secondary/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold">AirGradient Outdoor</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dedicated air quality monitor measuring particulate matter, carbon dioxide,
              volatile organic compounds, and nitrogen oxides. Provides AQI, CO&#8322;, TVOC,
              and NOx readings for comprehensive atmospheric quality assessment.
            </p>
          </div>

          <div className="rounded-lg border bg-secondary/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bird className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold">Solar-Powered BirdNET-Pi</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A Raspberry Pi running the BirdNET neural network for real-time bird species
              identification via audio analysis. Deployed on solar power for continuous
              24/7 operation. Detections are aggregated into rolling 24-hour species counts.
            </p>
          </div>
        </div>
      </Container>

      {/* Data Points */}
      <Container>
        <Title title="data points" />
        <p className="text-sm leading-relaxed mb-4">
          The following measurements are collected and available as both current readings
          and 7-day historical trend charts.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
              <Cloud className="h-4 w-4 text-accent" />
              Davis Vantage Pro 2 Plus
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Measurement</TableHead>
                  <TableHead className="w-28">Unit</TableHead>
                  <TableHead className="hidden sm:table-cell">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {davisMetrics.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell className="text-sm font-medium">{m.name}</TableCell>
                    <TableCell className="font-mono-data text-xs">{m.unit}</TableCell>
                    <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{m.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
              <Wind className="h-4 w-4 text-accent" />
              AirGradient Outdoor
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Measurement</TableHead>
                  <TableHead className="w-28">Unit</TableHead>
                  <TableHead className="hidden sm:table-cell">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {airgradientMetrics.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell className="text-sm font-medium">{m.name}</TableCell>
                    <TableCell className="font-mono-data text-xs">{m.unit}</TableCell>
                    <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{m.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
              <Bird className="h-4 w-4 text-accent" />
              BirdNET-Pi
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Measurement</TableHead>
                  <TableHead className="w-28">Unit</TableHead>
                  <TableHead className="hidden sm:table-cell">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {birdnetMetrics.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell className="text-sm font-medium">{m.name}</TableCell>
                    <TableCell className="font-mono-data text-xs">{m.unit}</TableCell>
                    <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">{m.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Container>

      {/* Infrastructure */}
      <Container>
        <Title title="infrastructure" />
        <p className="text-sm leading-relaxed mb-4">
          The data pipeline is built entirely in Go, with purpose-built applications handling
          sensor ingestion, data normalization, and API serving.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-secondary/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold">Collection</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Go applications poll each sensor platform on regular intervals, handling
              protocol translation and data normalization before writing to the database.
            </p>
          </div>

          <div className="rounded-lg border bg-secondary/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold">Storage</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All time-series data is stored in TimescaleDB, a PostgreSQL extension optimized
              for time-series workloads. This enables efficient querying for both real-time
              readings and historical aggregations.
            </p>
          </div>

          <div className="rounded-lg border bg-secondary/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="h-5 w-5 text-accent" />
              <h3 className="text-sm font-bold">Serving</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A Go API layer serves data to this Next.js frontend. External integrations
              include NWS forecasts, ElectricityMaps power grid data, and RaspberryShake
              seismic observations.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
