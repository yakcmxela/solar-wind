import { useContext } from "react";

import { AppContext, AppDispatchContext } from "~context/AppContext";

export const IncentivesSelect = () => {
  const appContext = useContext(AppContext);
  const appDispatch = useContext(AppDispatchContext);

  const { incentivesAll = [] } = appContext;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Select all that apply:</h2>
      <ul aria-multiselectable className="flex gap-2 flex-wrap">
        {incentivesAll.map((incentive) => (
          <li
            key={`${incentive.id}-select`}
            onClick={() => appDispatch.onChangeIncentives(incentive)}
            className={`cursor-pointer capitalize text-sm py-2 px-4 rounded-full border border-green-300 ${
              appContext.incentivesSelected
                ?.map((i) => i.id)
                .includes(incentive.id)
                ? "bg-green-100"
                : "bg-white"
            }`}
          >
            {incentive.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};
