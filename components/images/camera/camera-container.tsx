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
    <>
      <Container>
        <Title title={title} />
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 py-4">
          {camerasProps.map(
            (camera) =>
              !camera.disabled && <CameraCard key={camera.id} props={camera} />
          )}
        </div>
      </Container>
    </>
  );
}
