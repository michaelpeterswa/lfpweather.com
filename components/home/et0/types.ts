// Shape returned by GET /api/v1/et0.

export type ET0Point = {
  date: string; // YYYY-MM-DD, local
  et0: number; // mm for the day
  accumulated: number;
};

export type ET0Summary = {
  since: string;
  as_of: string;
  total: number; // accumulated mm year to date
  daily: ET0Point[];
};
