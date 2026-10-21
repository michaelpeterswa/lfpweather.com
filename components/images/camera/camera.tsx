import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

export type CameraCardProps = {
  id: number;
  title: string;
  description: string;
  url: string;
  disabled?: boolean;
  /**
   * Width / height of the thumbnail frame. Defaults to 16:9, which suits the
   * cameras. Square-ish forecast maps set their own so they fill the card
   * rather than sit in a letterbox. The image is always contained, never
   * stretched, so a source that changes size only ever letterboxes.
   */
  aspectRatio?: number;
};

export default function CameraCard({ props }: { props: CameraCardProps }) {
  const unoptimized = props.url.endsWith(".gif");
  const ratio = props.aspectRatio ?? 16 / 9;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">{props.title}</CardTitle>
        <CardDescription className="text-xs">{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg overflow-clip border">
          <Dialog>
            <VisuallyHidden>
              <DialogTitle>{props.title}</DialogTitle>
            </VisuallyHidden>
            <DialogTrigger asChild>
              <AspectRatio
                ratio={ratio}
                className="bg-muted"
              >
                <Image
                  unoptimized={unoptimized}
                  src={props.url}
                  alt={props.title}
                  className="object-contain"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                />
              </AspectRatio>
            </DialogTrigger>
            <DialogContent
              aria-describedby={undefined}
              className="w-auto max-w-none border-0 bg-transparent p-0 shadow-none"
            >
              {/* The largest box of the image's proportions that fits the
                  viewport, so the close button sits on the image's corner. */}
              <div
                className="relative"
                style={{
                  width: `min(95vw, calc(85vh * ${ratio}))`,
                  aspectRatio: ratio,
                }}
              >
                <Image
                  unoptimized={unoptimized}
                  src={props.url}
                  fill
                  alt={props.title}
                  className="object-contain"
                  sizes="95vw"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
