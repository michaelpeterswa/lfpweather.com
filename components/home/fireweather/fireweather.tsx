import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import DangerRating from "./danger-rating";
import FireStat from "./fire-stat";
import ErcChartWrapper from "./erc-chart-wrapper";
import { FireDangerSummary } from "./types";
import { biLevel, dead10hrLevel, kbdiLevel } from "./fire-levels";

// FireWeatherContainer fetches the season-calibrated fire danger summary and
// composes the hero rating, the labeled index tiles, and the ERC trend.
export default async function FireWeatherContainer() {
  const res = await fetch(
    `${process.env.API_BASE_URL ?? ""}/api/v1/fire_danger/summary`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY ?? "",
      },
    }
  );

  if (res.status !== 200) {
    return (
      <Container isAlert>
        <Title title="fire weather" />
        <p className="text-destructive text-sm">
          failed to get fire danger data
        </p>
      </Container>
    );
  }

  const s = (await res.json()) as FireDangerSummary;

  const bi = biLevel(s.burning_index.value, s.burning_index.p90, s.burning_index.p97);
  const drought = kbdiLevel(s.drought.kbdi);
  const fine = dead10hrLevel(s.fuel_moisture.dead_10hr);

  return (
    <Container>
      <Title title="fire weather" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <DangerRating rating={s.rating} erc={s.energy_release} />

        <div className="space-y-4 lg:col-span-2">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <FireStat
              label="energy release"
              value={s.energy_release.value.toFixed(1)}
              hint={s.rating.class}
              level={s.rating.level}
            />
            <FireStat
              label="burning index"
              value={s.burning_index.value.toFixed(1)}
              hint={bi.label}
              level={bi.level}
            />
            <FireStat
              label="drought (KBDI)"
              value={Math.round(s.drought.kbdi).toString()}
              unit="/800"
              hint={drought.label}
              level={drought.level}
            />
            <FireStat
              label="fine fuel moisture"
              value={s.fuel_moisture.dead_10hr.toFixed(0)}
              unit="%"
              hint={fine.label}
              level={fine.level}
            />
          </div>

          <ErcChartWrapper
            p90={s.energy_release.p90}
            p97={s.energy_release.p97}
          />
        </div>
      </div>
    </Container>
  );
}
