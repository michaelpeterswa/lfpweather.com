import { RECORD_PERIODS } from "./types";

// BrowseForm is a plain GET form (no client JavaScript): choosing a period and a
// date reloads the page with ?period=&at=, which the server renders. The "all"
// period ignores the date.
export default function BrowseForm({
  period,
  at,
}: {
  period?: string;
  at?: string;
}) {
  const field =
    "rounded-md border bg-background px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring";

  return (
    <form method="get" className="mt-4 flex flex-wrap items-end gap-3">
      <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        period
        <select name="period" defaultValue={period ?? "month"} className={field}>
          {RECORD_PERIODS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
        date
        <input type="date" name="at" defaultValue={at ?? ""} className={field} />
      </label>

      <button
        type="submit"
        className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
      >
        browse
      </button>
    </form>
  );
}
