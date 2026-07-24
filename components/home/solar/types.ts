// Shapes returned by the lfpweather-api structured query endpoint
// (POST /api/v1/query). Aggregation fields are optional because the API only
// includes the ones that were requested (and omits nulls).

export type QueryPoint = {
  time: string;
  avg?: number;
  min?: number;
  max?: number;
  first?: number;
  last?: number;
  count?: number;
  common_name?: string;
};

export type QueryResponse = {
  metric: string;
  type: string;
  start: string;
  end: string;
  bucket: string;
  group_by?: string;
  points: QueryPoint[];
};
