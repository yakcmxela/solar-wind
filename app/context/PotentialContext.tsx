import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useState } from "react";

import { SolarData } from "~data/solar";
import { IncentiveCategory, IncentiveType } from "~types/Incentives";
import { getEstimates } from "~data/estimates";
import { Product } from "~types/Products";
import { EstimatesResponse } from "~types/Estimates";

const round = (num: number) => Math.round(num * 100) / 100;

type Area = {
  meters: number;
  feet: number;
};

export const PotentialContext = createContext<{
  estimatesFound?: EstimatesResponse;
  isEstimating: boolean;
  isEstimationError: boolean;
  solarPanelArea?: Area;
  solarPanelSelected?: Product;
  windTurbineCount?: number;
  windTurbineSelected?: Product;
}>({
  isEstimationError: false,
  isEstimating: false,
});

export const PotentialDispatchContext = createContext<{
  onChangeCoords: (coords: [number, number]) => void;
  onChangeProduct: (type: IncentiveCategory, product: Product) => void;
  onChangeSolarPanelArea: (area: number) => void;
  onChangeWindTurbineCount: (count: number) => void;
  onRequestEstimate: () => void;
}>({
  onChangeCoords: () => {},
  onChangeProduct: () => {},
  onChangeSolarPanelArea: () => {},
  onChangeWindTurbineCount: () => {},
  onRequestEstimate: () => {},
});

export const PotentialContextProvider = ({ children }: PropsWithChildren) => {
  const [coords, setCoords] = useState<[number, number]>([0, 0]);
  const [solarPanelArea, setSolarPanelArea] = useState<Area>();
  const [solarPanelSelected, setSolarPanelSelected] = useState<Product>();
  const [windTurbineSelected, setWindTurbineSelected] = useState<Product>();
  const [windTurbineCount, setWindTurbineCount] = useState<number>();

  const {
    data: estimatesFound,
    isError: isEstimationError,
    isLoading: isEstimating,
    refetch: onRequestEstimate,
  } = useQuery<EstimatesResponse | undefined>({
    queryKey: ["estimate"],
    queryFn: () =>
      getEstimates({
        lat: coords[1],
        lng: coords[0],
        solarPanelArea: solarPanelArea?.meters,
        solarPanelProduct: solarPanelSelected,
        windTurbineCount: windTurbineCount ?? 0,
        windTurbineProduct: windTurbineSelected,
      }),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const onChangeCoords = (c: [number, number]) => {
    setCoords(c);
  };

  const onChangeSolarPanelArea = (a: number) => {
    const meters = round(a);
    const feet = round(a / 0.3048);
    setSolarPanelArea({ meters, feet });
  };

  const onChangeWindTurbineCount = (count: number) => {
    setWindTurbineCount(count);
  };

  const onChangeProduct = (incentive: IncentiveCategory, product: Product) => {
    if (incentive.type === IncentiveType.Solar) {
      setSolarPanelSelected(product);
    } else if (incentive.type === IncentiveType.Wind) {
      setWindTurbineSelected(product);
    }
  };

  return (
    <PotentialContext.Provider
      value={{
        estimatesFound,
        isEstimating,
        isEstimationError,
        solarPanelArea,
        solarPanelSelected,
        windTurbineCount,
        windTurbineSelected,
      }}
    >
      <PotentialDispatchContext.Provider
        value={{
          onChangeCoords,
          onChangeProduct,
          onChangeSolarPanelArea,
          onChangeWindTurbineCount,
          onRequestEstimate,
        }}
      >
        {children}
      </PotentialDispatchContext.Provider>
    </PotentialContext.Provider>
  );
};
