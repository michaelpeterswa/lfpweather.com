import { formatDistance } from "date-fns";
import Container from "@/components/layout/container/container";
import { NWSAlertActiveZoneResponse } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import Title from "@/components/layout/container/title";

export default async function AlertsContainer({ zone }: { zone: string }) {
  const res = await fetch(
    `https://api.weather.gov/alerts/active/zone/${zone}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (res.status !== 200) {
    return (
      <Container>
        <Title title="nws alerts" />
        <div className="bg-red-50 border-red-500 border rounded-lg shadow p-4 mb-4 flex justify-center">
          <h1>failed to get nws alerts</h1>
        </div>
      </Container>
    );
  } else {
    const alerts = (await res.json()) as NWSAlertActiveZoneResponse;

    if (alerts && alerts.features && alerts.features.length > 0) {
      return (
        <Container isAlert>
          <Title title="nws alerts" />
          <Container isAlert>
            <Accordion type="single" collapsible>
              {alerts.features.map((alert) => {
                const formattedExpires = formatDistance(
                  Date.parse(alert.properties.expires),
                  new Date(),
                  { addSuffix: true }
                );
                const formattedOnset = formatDistance(
                  Date.parse(alert.properties.onset),
                  new Date(),
                  { addSuffix: true }
                );
                const formattedEnds = formatDistance(
                  Date.parse(alert.properties.ends),
                  new Date(),
                  { addSuffix: true }
                );
                return (
                  <AccordionItem
                    className="border-b-0"
                    key={alert.id}
                    value={alert.id}
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex flex-col justify-start items-start">
                        <h1 className="font-semibold text-xl">
                          {alert.properties.event}
                        </h1>

                        <h3 className="text-muted-foreground">
                          ends {formattedEnds}
                        </h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="border-t pt-4 border-red-500">
                      <h2 className="text-muted-foreground">
                        starts {formattedOnset}
                      </h2>
                      <h2 className="text-muted-foreground">
                        expires {formattedExpires}
                      </h2>
                      <br />
                      <h2>{alert.properties.instruction}</h2>
                      <br />
                      <div className="font-mono">
                        {alert.properties.description
                          .split("\n")
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Container>
        </Container>
      );
    }
  }
}
