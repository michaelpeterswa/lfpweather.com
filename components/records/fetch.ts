import { RecordsResponse } from "./types";
import { apiFetch } from "@/lib/api";

// fetchRecords calls the records endpoint for one period, with an optional at=
// anchor to select a past period. It returns null on any failure so the caller
// can render an inline error without throwing.
export async function fetchRecords(
  period: string,
  at?: string
): Promise<RecordsResponse | null> {
  const qs = at ? `?at=${encodeURIComponent(at)}` : "";
  return apiFetch<RecordsResponse>(`/api/v1/records/${period}${qs}`, {
    revalidate: false,
  });
}
