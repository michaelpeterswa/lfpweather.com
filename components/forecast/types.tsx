export interface NWSGridpointForecastResponse {
  "@context": [string, Context];
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Context {
  "@version": string;
  wx: string;
  geo: string;
  unit: string;
  "@vocab": string;
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
}

export interface Properties {
  units: string;
  forecastGenerator: string;
  generatedAt: string;
  updateTime: string;
  validTimes: string;
  elevation: Elevation;
  periods: Period[];
}

export interface Elevation {
  unitCode: string;
  value: number;
}

export interface Period {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: string;
  probabilityOfPrecipitation: ProbabilityOfPrecipitation;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

export interface ProbabilityOfPrecipitation {
  unitCode: string;
  value?: number;
}
