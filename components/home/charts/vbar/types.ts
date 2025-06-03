
export type VBarSection = {
  label: string;
  value: number;
  color?: string;
};

export type VBarChartCardConfig = {
  title: string;
  description: string;
  footer?: string;
  unit: string;
  chartData?: VBarSection[];
};