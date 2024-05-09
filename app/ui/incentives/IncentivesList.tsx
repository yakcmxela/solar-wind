import { useContext } from "react";

import { IncentiveType } from "~types/Incentives";
import { IncentivesItem } from "~ui/incentives/IncentivesItem";
import { AppContext } from "~context/AppContext";

const incentiveColors = {
  [IncentiveType.ElectricVehicles]: "bg-green-50",
  [IncentiveType.EnergyEfficiency]: "bg-slate-50",
  [IncentiveType.Geothermal]: "bg-purple-50",
  [IncentiveType.Other]: "bg-gray-50",
  [IncentiveType.Solar]: "bg-yellow-50",
  [IncentiveType.Wind]: "bg-blue-50",
};

export const IncentivesList = () => {
  const appContext = useContext(AppContext);

  const {
    isEstimationError,
    isEstimating,
    incentivesFound = {},
    incentivesSelected = [],
  } = appContext;

  if (!isEstimating && Object.keys(incentivesFound).length === 0) {
    return null;
  }

  return incentivesSelected.map((incentive) => (
    <IncentivesItem
      key={incentive.id}
      color={incentiveColors[incentive.type]}
      found={incentivesFound[incentive.type as IncentiveType]}
      selected={incentive}
      isError={isEstimationError}
      isLoading={isEstimating}
    />
  ));
};
