import { useContext } from "react";

import { IncentiveType } from "~types/Incentives";
import { IncentivesItem } from "~ui/incentives/IncentivesItem";
import { PotentialContext } from "~context/PotentialContext";
import { IncentivesContext } from "~context/IncentivesContext";
import { LoadingSpinner } from "~ui/loading/LoadingSpinner";

const incentiveColors = {
  [IncentiveType.ElectricVehicles]: "bg-green-50",
  [IncentiveType.EnergyEfficiency]: "bg-slate-50",
  [IncentiveType.Geothermal]: "bg-purple-50",
  [IncentiveType.Other]: "bg-gray-50",
  [IncentiveType.Solar]: "bg-yellow-50",
  [IncentiveType.Wind]: "bg-blue-50",
};

export const IncentivesList = () => {
  const context = useContext(IncentivesContext);

  const {
    isSearching,
    incentivesFound = {},
    incentivesSelected = [],
  } = context;

  if (isSearching) {
    return (
      <div className="my-20 flex flex-col justify-center items-center">
        <LoadingSpinner />
        <p className="text-white font-bold my-4">Hang tight...</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-y-4 my-4">
      {Object.keys(incentivesFound).map((key) => {
        const incentives = incentivesFound[key as IncentiveType];
        return (
          <li key={`${key}-found`}>
            <IncentivesItem
              color={incentiveColors[key as IncentiveType]}
              found={incentives}
              selected={incentivesSelected.find((s) => s.type === key)!}
            />
          </li>
        );
      })}
    </ul>
  );
};
