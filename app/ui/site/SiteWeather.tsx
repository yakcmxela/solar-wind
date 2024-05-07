import { useContext } from "react";

import { AppContext } from "~context/AppContext";

export const SiteWeather = () => {
  const appContext = useContext(AppContext);
  const solarData = appContext.solarData;

  return (
    <section>
      <div className="bg-slate-100 rounded-lg p-4">
        {!solarData ? (
          <p className="text-sm">No data available for this ZIP code.</p>
        ) : (
          <>
            <p className="text-sm">
              <strong>Solar Radiation: </strong>
              {solarData.solarradiation}
            </p>
            <p className="text-sm">
              <strong>UV Index:</strong> {solarData.uv}
            </p>
          </>
        )}
      </div>
    </section>
  );
};
