import { formatDistance } from "date-fns";
import Container from "../layout/container/container";
import { NWSAlertActiveZoneResponse } from "./types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import Title from "../layout/container/title";

async function getAlerts(zone: string): Promise<NWSAlertActiveZoneResponse> {
  const res = await fetch(
    `https://api.weather.gov/alerts/active/zone/${zone}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.status === 200) {
    return res.json() as Promise<NWSAlertActiveZoneResponse>;
  } else {
    throw new Error("failed to get nws alerts");
  }
}

export default async function AlertsContainer({ zone }: { zone: string }) {
  const alerts = await getAlerts(zone);

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
              return (
                <AccordionItem key={alert.id} value={alert.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col justify-start items-start">
                      <h1 className="font-semibold text-xl">
                        {alert.properties.event}
                      </h1>
                      <h3>expires {formattedExpires}</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
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
