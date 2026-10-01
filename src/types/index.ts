export type ScopeType = 'all' | 'scope1' | 'scope2' | 'scope3';

export interface ScopeMetric {
  name: string;
  scope: 'Scope 1' | 'Scope 2' | 'Scope 3';
  percentage: number;
  value: number; // in tonnes
  color: string;
  description: string;
}

export interface MonthlyEmissions {
  month: string;
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
}

export interface EmitterItem {
  id: string;
  name: string;
  category: 'facility' | 'source';
  emissions: number; // in tCO2e
  percentage: number;
  location?: string;
  primaryScope: 'Scope 1' | 'Scope 2' | 'Scope 3';
  trend: number; // % change YoY
}

export interface YearEmissionsData {
  year: number;
  totalEmissions: number; // 141.6k etc
  previousYear: number;
  baselineYear: number;
  deviationFromTarget: number;
  previousYearPct: number;
  baselineYearPct: number;
  deviationPct: number;
  netEmissions: number;
  totalOffset: number;
  scopes: {
    scope1: ScopeMetric;
    scope2: ScopeMetric;
    scope3: ScopeMetric;
  };
  monthly: MonthlyEmissions[];
  topFacilities: EmitterItem[];
  topSources: EmitterItem[];
  energy: {
    windProduced: number; // kWh
    solarProduced: number; // kWh
    totalProduced: number; // kWh
    totalConsumed: number; // kWh
    surplus: number;
    avoidedCarbon: number; // tonnes
    windSpeed: number; // m/s
    windRpm: string;
    efficiency: number;
  };
}

export interface CarbonCreditProject {
  id: string;
  name: string;
  standard: string; // e.g. Verra VCS, Gold Standard, Puro.earth
  category: string;
  location: string;
  pricePerTonne: number; // USD
  availableTonnes: number;
  rating: string;
  description: string;
}
