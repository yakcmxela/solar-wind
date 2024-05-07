import { useContext } from "react";

import { AppContext, AppDispatchContext } from "~context/AppContext";
import { Button } from "~ui/buttons/Button";

export const SiteCalculate = () => {
  const appContext = useContext(AppContext);
  const appDispatch = useContext(AppDispatchContext);
  return (
    <>
      {/* TODO: add Incentive categories as multi select and update context */}
      <Button
        className="mt-auto disabled:opacity-50"
        disabled={appContext.area === undefined}
        onClick={appDispatch.onEstimate}
      >
        Estimate savings &amp; incentives
      </Button>
    </>
  );
};
