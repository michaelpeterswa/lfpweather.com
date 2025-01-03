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
};

export default function CameraCard({ props }: { props: CameraCardProps }) {
  return (
    <Card className="w-11/12 md:w-5/12">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg overflow-clip border shadow">
          <Dialog>
            <VisuallyHidden>
              <DialogTitle>{props.title}</DialogTitle>
            </VisuallyHidden>
            <DialogTrigger asChild>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={props.url}
                  alt={props.title}
                  className=""
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </AspectRatio>
            </DialogTrigger>
            <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
              <div className="relative w-full overflow-clip rounded-lg bg-transparent shadow-md">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={props.url}
                    fill
                    alt={props.title}
                    className="h-full w-full object-fill"
                  />
                </AspectRatio>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
