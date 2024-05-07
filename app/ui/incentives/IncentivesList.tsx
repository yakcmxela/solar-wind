import { useContext } from "react";

import { IncentiveCategory } from "~types/IncentiveCategory";
import { IncentivesItem } from "~ui/incentives/IncentivesItem";
import { AppContext } from "~context/AppContext";

const incentiveColors = {
  [IncentiveCategory.ElectricVehicles]: "bg-green-50",
  [IncentiveCategory.EnergyEfficiency]: "bg-slate-50",
  [IncentiveCategory.Geothermal]: "bg-purple-50",
  [IncentiveCategory.Other]: "bg-gray-50",
  [IncentiveCategory.Solar]: "bg-yellow-50",
  [IncentiveCategory.Wind]: "bg-blue-50",
};

export const IncentivesList = () => {
  const appContext = useContext(AppContext);

  const {
    isEstimationError,
    isEstimating,
    incentives = {},
    incentiveCategories = [],
  } = appContext;

  if (!isEstimating && Object.keys(incentives).length === 0) {
    return null;
  }

  return incentiveCategories.map((category) => (
    <IncentivesItem
      key={category}
      color={incentiveColors[category]}
      incentives={incentives[category as IncentiveCategory]}
      category={category}
      isError={isEstimationError}
      isLoading={isEstimating}
    />
  ));
};
