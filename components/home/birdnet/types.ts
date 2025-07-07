export interface BirdnetCount {
  common_name: string;
  count: number;
}

export type BirdnetCounts = BirdnetCount[];

export type BirdnetCardConfig = {
    title: string
    value: number
    unit: string
    time: string
}