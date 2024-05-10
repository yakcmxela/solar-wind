import { useContext } from "react";

import {
  IncentivesContext,
  IncentivesDispatchContext,
} from "~context/IncentivesContext";
import { Button } from "~ui/buttons/Button";

export const IncentivesSearch = ({ className }: { className?: string }) => {
  const context = useContext(IncentivesContext);
  const dispatch = useContext(IncentivesDispatchContext);
  return (
    <Button
      className={`w-full disabled:opacity-50 ${className}`}
      disabled={
        (context.incentivesSelected || []).length === 0 || context.isSearching
      }
      onClick={dispatch.onRequestIncentives}
    >
      Search
    </Button>
  );
};
