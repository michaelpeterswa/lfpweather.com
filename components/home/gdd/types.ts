// Shape returned by GET /api/v1/gdd.

export type GDDPoint = {
  date: string; // YYYY-MM-DD, local
  gdd: number;
  accumulated: number;
};

export type GDDSummary = {
  base_f: number;
  since: string; // YYYY-MM-DD
  as_of: string; // YYYY-MM-DD
  total: number;
  daily: GDDPoint[];
};
