import { useContext } from "react";

import { PotentialContext, PotentialDispatchContext } from "~context/PotentialContext";
import { Button } from "~ui/buttons/Button";

export const PotentialCalculate = () => {
  const appContext = useContext(PotentialContext);
  const appDispatch = useContext(PotentialDispatchContext);
  return (
    <div className="flex gap-2">
      <Button
        className="flex-grow disabled:opacity-50"
        disabled={
          (appContext.solarPanelArea === undefined &&
            !appContext.solarPanelSelected) ||
          (appContext.windTurbineCount === undefined &&
            !appContext.windTurbineSelected)
        }
        onClick={appDispatch.onRequestEstimate}
      >
        Estimate output
      </Button>
    </div>
  );
};
