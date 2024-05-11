import { useContext } from "react";

import { IncentiveType } from "~types/Incentives";
import { IncentivesItem } from "~ui/incentives/IncentivesItem";
import { IncentivesContext } from "~context/IncentivesContext";
import { LoadingSpinner } from "~ui/loading/LoadingSpinner";

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

  console.log({incentivesFound})

  return (
    <ul className="flex flex-col gap-y-4 my-4">
      {Object.keys(incentivesFound).map((key) => {
        const incentives = incentivesFound[key as IncentiveType];
        const selected = incentivesSelected.find((s) => s.type === key)
        if(!selected || incentives.length === 0) return null;
        return (
          <li key={`${key}-found`}>
            <IncentivesItem
              found={incentives}
              selected={selected}
            />
          </li>
        );
      })}
    </ul>
  );
};
