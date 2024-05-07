import { useContext } from "react";

import { AppContext } from "~context/AppContext";

export const SiteSize = () => {
  const appContext = useContext(AppContext);
  return (
    <div className="p-4 rounded-lg bg-slate-100">
      {appContext.area !== undefined && (
        <div className="mb-2">
          <p className="text-sm">
            <strong>Meters: </strong>
            {appContext.area?.meters}
          </p>
          <p className="text-sm">
            <strong>Feet: </strong>
            {appContext.area?.feet}
          </p>
        </div>
      )}
      <p className="text-sm mb-2">
        <strong>To calculate:</strong>
      </p>
      <ol className="text-sm list-number ml-4">
        <li>1. Click on the map to begin outlining your roof. </li>
        <li>2. Double click to complete the shapes.</li>
        <li>3. Hit estimate!</li>
      </ol>
    </div>
  );
};
