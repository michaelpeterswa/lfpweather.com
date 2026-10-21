"use client";

import { useEffect } from "react";
import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import { Button } from "@/components/ui/button";

// Last-resort boundary for a page that throws while rendering. Sections handle
// their own fetch failures, so reaching this means something unexpected broke;
// the nav and footer in the root layout stay up around it.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container isAlert>
      <Title title="something went wrong" />
      <p className="text-sm mb-4">
        This page failed to load. The weather station is probably fine; try
        again in a moment.
      </p>
      <Button variant="outline" size="sm" onClick={reset}>
        try again
      </Button>
    </Container>
  );
}
