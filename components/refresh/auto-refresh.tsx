"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// AutoRefresh re-renders the page's server components on an interval so a tab
// left open keeps showing current conditions, and so "3 minutes ago" labels
// (computed at render) stay true.
//
// router.refresh() is a transition: sections already on screen keep their
// content until the new render is ready rather than falling back to their
// skeletons, and client state (an open dialog, the alerts accordion, the ask
// bar) survives. Backend fetches are cached for 60s, so a refresh costs at
// most one request per endpoint per minute however many tabs are open.
//
// It only runs while the tab is visible. A hidden tab refreshes as soon as it
// becomes visible again if it has gone stale, so returning to the page shows
// current data without waiting out the rest of the interval.
export default function AutoRefresh({
  intervalSeconds = 60,
}: {
  intervalSeconds?: number;
}) {
  const router = useRouter();

  useEffect(() => {
    const intervalMs = intervalSeconds * 1000;
    let last = Date.now();
    let timer: ReturnType<typeof setInterval> | undefined;

    const refresh = () => {
      last = Date.now();
      router.refresh();
    };

    const start = () => {
      if (timer === undefined) {
        timer = setInterval(refresh, intervalMs);
      }
    };
    const stop = () => {
      clearInterval(timer);
      timer = undefined;
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stop();
        return;
      }
      if (Date.now() - last >= intervalMs) {
        refresh();
      }
      start();
    };

    if (document.visibilityState === "visible") {
      start();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    // A laptop waking from sleep comes back online with stale data.
    window.addEventListener("online", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("online", onVisibilityChange);
    };
  }, [router, intervalSeconds]);

  return null;
}
