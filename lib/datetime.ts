// Timestamp formatting for a site that describes one physical place.
//
// Two different bugs came from formatting wall-clock times without saying
// which clock:
//
//   * The power breakdown rendered "today at 3:49 PM" for a reading taken at
//     8:49 AM local. It is a server component, the pod has no TZ set, and so
//     date-fns formatted in the container's UTC. Nothing corrected it later,
//     because a server component renders once.
//
//   * Every history chart threw React error #418, a hydration text mismatch.
//     The chart is a client component, but Next.js server-renders it too, so
//     `toLocaleString()` produced UTC labels in the HTML and local labels
//     after hydration.
//
// Naming the zone explicitly fixes both. The server and the browser now agree,
// which is what removes the hydration mismatch, and a reader in another
// timezone still sees the time it was where the sensors are -- which is the
// only reading that means anything for weather data.
//
// Durations are a separate case and are deliberately NOT handled here.
// date-fns `formatDistance` produces "3 minutes ago", which is identical in
// every timezone and therefore safe to render on the server. Prefer it
// wherever an absolute time is not required.

export const SITE_TIME_ZONE = "America/Los_Angeles";

// Fixed locale as well as fixed zone. `toLocaleString()` with no locale uses
// the runtime's default, which differs between the server and the browser and
// would reintroduce the mismatch through a different door.
const SITE_LOCALE = "en-US";

/** Axis ticks and other compact labels: "Aug 3, 9:00 AM". */
export function formatSiteShort(value: string | number | Date): string {
  return new Intl.DateTimeFormat(SITE_LOCALE, {
    timeZone: SITE_TIME_ZONE,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(toDate(value));
}

/** Prose, where the year matters: "Jul 31, 2026, 11:30 PM PDT".
 *
 * Spelled out field by field rather than with dateStyle/timeStyle, because
 * Intl rejects those combined with any individual component -- including
 * timeZoneName, which is the part worth having here. Mixing them throws
 * "Invalid option : option" at runtime, which neither eslint nor tsc catches.
 */
export function formatSiteLong(value: string | number | Date): string {
  return new Intl.DateTimeFormat(SITE_LOCALE, {
    timeZone: SITE_TIME_ZONE,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(toDate(value));
}

function toDate(value: string | number | Date): Date {
  return value instanceof Date ? value : new Date(value);
}
