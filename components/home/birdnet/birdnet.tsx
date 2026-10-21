import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { BirdnetCounts } from "./types";
import { apiFetch } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SectionError } from "@/components/layout/error-state";

export default async function BirdnetContainer() {
  const birdnetCounts = await apiFetch<BirdnetCounts>("/api/v1/birdnet/24h", {
    nullBody: [],
  });
  if (!birdnetCounts) {
    return (
      <SectionError title="BirdNET 24h" message="failed to get bird counts" />
    );
  } else {
    const sorted = birdnetCounts.length === 0
      ? []
      : [...birdnetCounts].sort((a, b) => b.count - a.count);

    const maxCount = sorted.length > 0 ? sorted[0].count : 1;

    return (
      <Container>
        <Title title="BirdNET 24h" />
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">No detections in the last 24 hours.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">#</TableHead>
                <TableHead>Species</TableHead>
                <TableHead className="text-right w-24">Detections</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((bird, i) => (
                <TableRow key={bird.common_name}>
                  <TableCell className="font-mono-data text-xs text-muted-foreground">
                    {i + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{bird.common_name}</span>
                      <div className="hidden sm:block flex-1 max-w-[120px]">
                        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${(bird.count / maxCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono-data text-sm font-semibold">
                    {bird.count}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <p className="text-xs text-muted-foreground mt-2">Updated now</p>
      </Container>
    );
  }
}
