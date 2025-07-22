import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { VBarChartCardConfig, VBarSection } from "../charts/vbar/types";
import { VBarChartCard } from "../charts/vbar/vbar";
import { BirdnetCounts } from "./types";

export default async function BirdnetContainer() {
  const res = await fetch(
    `${process.env.API_BASE_URL ?? ""}/api/v1/birdnet/24h`,
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
        <Title title="birdnet" />
        <div className="border-red-500 bg-red-50 dark:bg-red-950 border rounded-lg shadow p-4 mb-4 flex justify-center">
          <h1>failed to get bird counts</h1>
        </div>
      </Container>
    );
  } else {
    const birdnetCounts = (await res.json()) as BirdnetCounts;

    const birdnetVBarConfig: VBarChartCardConfig = {
      title: "BirdNET Species Count",
      description: "Current bird species count",
      unit: " detections",
      chartData: (!birdnetCounts || birdnetCounts.length === 0) ? [] : birdnetCounts.map((bird) => ({
        label: bird.common_name,
        value: bird.count,
      })) as VBarSection[],
      footer: `Updated now`,
    };

    return (
      <Container>
        <Title title="BirdNET 24h" />
        <div className="flex w-full justify-center flex-wrap gap-2 md:gap-4 py-4">
          <VBarChartCard config={birdnetVBarConfig} />
        </div>
      </Container>
    );
  }
}
