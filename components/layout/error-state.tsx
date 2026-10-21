import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudLightning } from "lucide-react";
import Container from "./container/container";
import Title from "./container/title";

// Shared failure states, one per shape of thing that can fail to load. The
// red comes from the destructive token, tinted, so it follows the theme. The
// message keeps the normal text color: in dark mode the destructive token is a
// dark red that is hard to read as text on a dark card.

// SectionError replaces a whole dashboard section.
export function SectionError({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <Container isAlert>
      <Title title={title} />
      <p className="text-sm">{message}</p>
    </Container>
  );
}

// ChartCardError replaces one chart card in a grid of them.
export function ChartCardError({
  title,
  description,
  message,
}: {
  title: string;
  description: string;
  message: string;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold tracking-wide">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="bg-destructive/10 border-destructive border rounded-lg p-4 m-4">
        <div className="flex flex-col items-center gap-1">
          <CloudLightning size={48} className="text-destructive" aria-hidden />
          <p className="text-sm">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// TileError replaces one current-value tile.
export function TileError({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-destructive bg-destructive/10 p-3">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="font-mono-data text-sm font-semibold">unavailable</p>
    </div>
  );
}
