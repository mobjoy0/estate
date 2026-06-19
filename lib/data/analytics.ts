// Sample market-intelligence series for the investment analytics dashboard.

export interface ForecastPoint {
  year: string;
  value: number; // index price (base 100)
  conservative: number;
}

export const APPRECIATION_FORECAST: ForecastPoint[] = [
  { year: "2021", value: 100, conservative: 100 },
  { year: "2022", value: 112, conservative: 108 },
  { year: "2023", value: 129, conservative: 119 },
  { year: "2024", value: 147, conservative: 131 },
  { year: "2025", value: 168, conservative: 142 },
  { year: "2026", value: 193, conservative: 156 },
  { year: "2027", value: 224, conservative: 171 },
  { year: "2028", value: 258, conservative: 188 },
];

export interface OccupancyPoint {
  month: string;
  occupancy: number;
  yield: number;
}

export const OCCUPANCY_TREND: OccupancyPoint[] = [
  { month: "Jan", occupancy: 81, yield: 6.2 },
  { month: "Feb", occupancy: 83, yield: 6.4 },
  { month: "Mar", occupancy: 86, yield: 6.7 },
  { month: "Apr", occupancy: 88, yield: 6.9 },
  { month: "May", occupancy: 90, yield: 7.1 },
  { month: "Jun", occupancy: 91, yield: 7.3 },
  { month: "Jul", occupancy: 93, yield: 7.5 },
  { month: "Aug", occupancy: 94, yield: 7.6 },
  { month: "Sep", occupancy: 95, yield: 7.8 },
];

export interface DistrictGrowth {
  district: string;
  growth: number; // % YoY
  yield: number;
}

export const DISTRICT_GROWTH: DistrictGrowth[] = [
  { district: "Marina", growth: 18.4, yield: 7.8 },
  { district: "Skyline", growth: 22.1, yield: 6.9 },
  { district: "Garden", growth: 14.7, yield: 8.4 },
  { district: "Innovation", growth: 19.6, yield: 7.2 },
  { district: "Heritage", growth: 11.3, yield: 8.9 },
];

export interface AssetMix {
  name: string;
  value: number;
  color: string;
}

export const ASSET_MIX: AssetMix[] = [
  { name: "Residential", value: 48, color: "#5eead4" },
  { name: "Commercial", value: 24, color: "#60a5fa" },
  { name: "Mixed-Use", value: 18, color: "#a78bfa" },
  { name: "Hospitality", value: 10, color: "#f0b27a" },
];

export interface KpiStat {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}

export const KPI_STATS: KpiStat[] = [
  { label: "Portfolio Value", value: "$6.1B", delta: "+14.2%", positive: true },
  { label: "Avg. Annual ROI", value: "10.8%", delta: "+1.6 pts", positive: true },
  { label: "Avg. Rental Yield", value: "7.4%", delta: "+0.5 pts", positive: true },
  { label: "Avg. Occupancy", value: "94%", delta: "+3.1%", positive: true },
  { label: "Capital Appreciation", value: "+18.9%", delta: "YoY", positive: true },
  { label: "Days to Sell", value: "27", delta: "-9 days", positive: true },
];
