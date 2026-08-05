import { RecordsResponse } from "./types";

// fetchRecords calls the records endpoint for one period, with an optional at=
// anchor to select a past period. It returns null on any non-200 so the caller
// can render an inline error without throwing.
export async function fetchRecords(
  period: string,
  at?: string
): Promise<RecordsResponse | null> {
  const qs = at ? `?at=${encodeURIComponent(at)}` : "";
  const res = await fetch(
    `${process.env.API_BASE_URL ?? ""}/api/v1/records/${period}${qs}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY ?? "",
      },
      cache: "no-store",
    }
  );

  if (res.status !== 200) {
    return null;
  }

  return (await res.json()) as RecordsResponse;
}
