import { useContext } from "react";

import { AppContext, AppDispatchContext } from "~context/AppContext";
import { Button } from "~ui/buttons/Button";

export const SiteCalculate = () => {
  const appContext = useContext(AppContext);
  const appDispatch = useContext(AppDispatchContext);
  return (
    <div className="flex gap-2">
      <Button
        className="flex-grow disabled:opacity-50"
        disabled={appContext.area === undefined}
        onClick={appDispatch.onRequestEstimate}
      >
        Estimate output
      </Button>
      <Button
        disabled={(appContext.incentivesSelected || []).length === 0}
        className="flex-grow disabled:opacity-50"
        onClick={appDispatch.onRequestIncentives}
      >
        Get incentives
      </Button>
    </div>
  );
};
