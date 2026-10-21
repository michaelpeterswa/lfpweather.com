import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Card, CardContent } from "@/components/ui/card";

export default function RaspberryShakeContainer() {
  return (
    <Container>
      <Title title="seismology" />
      <Card>
        <CardContent className="p-4 flex justify-center">
          <iframe
            title="Raspberry Shake seismograph for station AM.S9561"
            loading="lazy"
            className="w-full h-96 rounded"
            src="https://dataview.raspberryshake.org/#/embed/AM/S9561/00/EHZ"
          ></iframe>
        </CardContent>
      </Card>
    </Container>
  );
}
