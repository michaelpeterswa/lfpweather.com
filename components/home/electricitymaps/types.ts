export interface GetPowerBreakdownResponse {
  zone: string
  zoneName: string
  datetime: string
  updatedAt: string
  createdAt: string
  powerConsumptionBreakdown: PowerConsumptionBreakdown
  powerProductionBreakdown: PowerProductionBreakdown
  powerImportBreakdown: PowerImportBreakdown
  powerExportBreakdown: PowerExportBreakdown
  fossilFreePercentage: number
  renewablePercentage: number
  powerConsumptionTotal: number
  powerProductionTotal: number
  powerImportTotal: number
  powerExportTotal: number
  isEstimated: boolean
  estimationMethod: string
}

export interface PowerConsumptionBreakdown {
  nuclear: number
  geothermal: number
  biomass: number
  coal: number
  wind: number
  solar: number
  hydro: number
  gas: number
  oil: number
  unknown: number
  "hydro discharge": number
  "battery discharge": number
}

export interface PowerProductionBreakdown {
  nuclear: number | null 
  geothermal: number | null 
  biomass: number | null 
  coal: number | null 
  wind: number | null 
  solar: number | null 
  hydro: number | null 
  gas: number | null 
  oil: number | null 
  unknown: number | null 
  "hydro discharge": number | null 
  "battery discharge": number | null 
}

export interface ImportExportAdorned {
  zoneName: string
  value: number | null // Using `number | null` to match the Go structure with a pointer-like behavior
}

export type PowerImportBreakdown = Record<string, ImportExportAdorned>

export type PowerExportBreakdown = Record<string, ImportExportAdorned>