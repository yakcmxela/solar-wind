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
  const context = useContext(IncentivesContext);
  const dispatch = useContext(IncentivesDispatchContext);

  return (
    <ul
      aria-multiselectable
      className="no-scrollbar flex gap-2 md:flex-col md:flex-wrap w-full text-center overflow-scroll md:overflow-visible"
    >
      {incentives.map((incentive) => (
        <li
          className="md:w-full flex-shrink-0"
          key={`${incentive.id}-select`}
          onClick={() => dispatch.onChangeIncentives(incentive)}
        >
          <Button
            className={`capitalize px-8 w-full border-0 ${
              context.incentivesSelected
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
