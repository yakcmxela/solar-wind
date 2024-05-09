export enum IncentiveType {
  Solar = "solar",
  Wind = "wind",
  Geothermal = "geothermal",
  ElectricVehicles = "electric vehicles",
  EnergyEfficiency = "energy efficiency",
  Other = "other",
}

export type IncentiveCategory = {
  type: IncentiveType;
  id: string;
  display_name: string;
};

export type Incentive = {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  requirements: string;
  source: string;
};
