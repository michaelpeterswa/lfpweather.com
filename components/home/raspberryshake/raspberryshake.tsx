import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Card, CardContent } from "@/components/ui/card";

export default async function RaspberryShakeContainer() {
  return (
    <Container>
      <Title title="seismology" />
      <Card className="w-full">
        <CardContent className="p-6 flex justify-center">
          <iframe
            className="w-full max-w-4xl h-96"
            src="https://dataview.raspberryshake.org/#/embed/AM/S9561/00/EHZ"
          ></iframe>
        </CardContent>
      </Card>
    </Container>
  );
}
