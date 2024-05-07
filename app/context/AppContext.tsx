import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useMemo, useState } from "react";
import { getIncentives } from "~data/incentives";

import { SolarData } from "~data/solar";
import { IncentiveCategory } from "~types/IncentiveCategory";
import { IncentivesResponse } from "~types/IncentivesResponse";
import { PhysicalAddress } from "~types/PhysicalAddress";

export const AppContext = createContext<{
  area?: {
    meters: number;
    feet: number;
  };
  incentives?: IncentivesResponse;
  incentiveCategories?: IncentiveCategory[];
  isEstimating: boolean;
  isEstimationError: boolean;
  physicalAddress?: PhysicalAddress;
  solarData?: SolarData;
}>({
  isEstimationError: false,
  isEstimating: false,
});

export const AppDispatchContext = createContext<{
  onChangeArea: (area: number) => void;
  onEstimate: () => void;
}>({
  onChangeArea: () => {},
  onEstimate: () => {},
});

const round = (num: number) => Math.round(num * 100) / 100;

export const AppContextProvider = ({
  children,
  incentiveCategories,
  physicalAddress,
  solarData,
}: PropsWithChildren & {
  incentiveCategories?: IncentiveCategory[];
  physicalAddress: PhysicalAddress;
  solarData?: SolarData;
}) => {
  const [area, setArea] = useState<{
    meters: number;
    feet: number;
  }>();

  const {
    data,
    isError: isEstimationError,
    isLoading: isEstimating,
    refetch: onEstimate,
  } = useQuery<string>({
    queryKey: ["estimate"],
    queryFn: () => getIncentives(incentiveCategories || [], physicalAddress),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const onChangeArea = (a: number) => {
    const meters = round(a);
    const feet = round(a / 0.3048);
    setArea({ meters, feet });
  };

  const incentives = useMemo(() => {
    if (!data) return undefined;
    return JSON.parse(data || "{}") as IncentivesResponse;
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        area,
        incentiveCategories,
        incentives,
        isEstimating,
        isEstimationError,
        physicalAddress,
        solarData,
      }}
    >
      <AppDispatchContext.Provider
        value={{
          onChangeArea,
          onEstimate,
        }}
      >
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};
