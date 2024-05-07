import { IncentiveCategory } from "./IncentiveCategory";

export type IncentivesResponse = {
  [IncentiveCategory.ElectricVehicles]?: Incentive[];
  [IncentiveCategory.EnergyEfficiency]?: Incentive[];
  [IncentiveCategory.Geothermal]?: Incentive[];
  [IncentiveCategory.Other]?: Incentive[];
  [IncentiveCategory.Solar]?: Incentive[];
  [IncentiveCategory.Wind]?: Incentive[];
};

export type Incentive = {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  requirements: string;
  source: string;
}