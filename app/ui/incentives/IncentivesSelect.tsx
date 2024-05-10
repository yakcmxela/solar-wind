import { useContext } from "react";
import {
  IncentivesContext,
  IncentivesDispatchContext,
} from "~context/IncentivesContext";
import { IncentiveCategory } from "~types/Incentives";
import { Button } from "~ui/buttons/Button";

export const IncentivesSelect = ({
  incentives,
}: {
  incentives: IncentiveCategory[];
}) => {
  const appContext = useContext(IncentivesContext);
  const appDispatch = useContext(IncentivesDispatchContext);

  return (
    <ul
      aria-multiselectable
      className="flex flex-col gap-2 flex-wrap w-full text-center"
    >
      {incentives.map((incentive) => (
        <li
          className="w-full"
          key={`${incentive.id}-select`}
          onClick={() => appDispatch.onChangeIncentives(incentive)}
        >
          <Button
            className={`capitalize px-8 w-full border-0 ${
              appContext.incentivesSelected
                ?.map((i) => i.id)
                .includes(incentive.id)
                ? "!bg-cyan-500"
                : "bg-indigo-500"
            }`}
          >
            {incentive.display_name}
          </Button>
        </li>
      ))}
    </ul>
  );
};
