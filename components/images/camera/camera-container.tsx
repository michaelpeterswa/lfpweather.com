import Container from "@/components/layout/container/container";
import CameraCard, { CameraCardProps } from "./camera";
import Title from "@/components/layout/container/title";

export default function CameraContainer({
  title,
  camerasProps,
}: {
  title: string;
  camerasProps: CameraCardProps[];
}) {
  return (
    <Container>
      <Title title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {camerasProps.map(
          (camera) =>
            !camera.disabled && <CameraCard key={camera.id} props={camera} />
        )}
      </div>
    </Container>
  );
}
