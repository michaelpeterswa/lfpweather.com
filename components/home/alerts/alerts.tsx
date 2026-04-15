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
      <Container isAlert>
        <Title title="nws alerts" />
        <div className="bg-red-50 dark:bg-red-950 border-destructive border rounded-lg p-4 flex justify-center">
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
          <Accordion type="single" collapsible>
            {alerts.features.map((alert) => {
              const safeFormatDistance = (value: string | null) => {
                if (!value) return null;
                const parsed = Date.parse(value);
                if (Number.isNaN(parsed)) return null;
                return formatDistance(parsed, new Date(), { addSuffix: true });
              };
              const formattedExpires = safeFormatDistance(
                alert.properties.expires
              );
              const formattedOnset = safeFormatDistance(
                alert.properties.onset
              );
              const formattedEnds = safeFormatDistance(alert.properties.ends);
              return (
                <AccordionItem
                  className="border-b-0"
                  key={alert.id}
                  value={alert.id}
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col justify-start items-start">
                      <h1 className="font-semibold text-lg">
                        {alert.properties.event}
                      </h1>
                      {formattedEnds && (
                        <h3 className="text-sm text-muted-foreground">
                          ends {formattedEnds}
                        </h3>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-t pt-4 border-destructive">
                    {formattedOnset && (
                      <p className="text-sm text-muted-foreground">
                        starts {formattedOnset}
                      </p>
                    )}
                    {formattedExpires && (
                      <p className="text-sm text-muted-foreground">
                        expires {formattedExpires}
                      </p>
                    )}
                    <br />
                    <p className="text-sm">{alert.properties.instruction}</p>
                    <br />
                    <div className="font-mono-data text-xs leading-relaxed">
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
      );
    }
  }
}
