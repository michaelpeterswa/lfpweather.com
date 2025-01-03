export type LineSection = {
  time: string;
  min: number;
  avg: number;
  max: number;
};

export enum TrendDirection {
  Up,
  Down,
  Flat,
}

export type Trend = {
  direction: TrendDirection;
  percentage?: string;
};

export type LineChartCardConfig = {
  title: string;
  description: string;
  trend?: Trend;
  footer?: string;
  unit: string;
  chartData?: LineSection[];
};
