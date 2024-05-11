import { useContext, useMemo } from "react";

import {
  PotentialContext,
  PotentialDispatchContext,
} from "~context/PotentialContext";
import { Button } from "~ui/buttons/Button";

export const PotentialCalculate = () => {
  const context = useContext(PotentialContext);
  const dispatch = useContext(PotentialDispatchContext);

  const disabled = useMemo(() => {
    if (
      context.solarPanelArea !== undefined &&
      !context.solarPanelSelected
    ) {
      return true;
    }
    if (
      (context.windTurbineCount || 0) > 0 &&
      !context.windTurbineSelected
    ) {
      return true;
    }
    if (
      context.windTurbineCount === undefined &&
      context.solarPanelArea === undefined
    ) {
      return true;
    }

    return false;
  }, [
    context.solarPanelArea,
    context.solarPanelSelected,
    context.windTurbineCount,
    context.windTurbineSelected,
  ]);

  return (
    <Button
      className="w-full sm:w-auto disabled:opacity-50"
      disabled={disabled}
      onClick={dispatch.onRequestEstimate}
    >
      Estimate output
    </Button>
  );
};
