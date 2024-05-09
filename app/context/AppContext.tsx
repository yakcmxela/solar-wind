import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useState } from "react";
import { getIncentives } from "~data/incentives";

import { SolarData } from "~data/solar";
import { Incentive, IncentiveCategory, IncentiveType } from "~types/Incentives";
import { AddressPhysical } from "~types/Address";
import { getEstimates } from "~data/estimates";
import { Product } from "~types/Products";

export const AppContext = createContext<{
  area?: {
    meters: number;
    feet: number;
  };
  estimatesFound?: Record<string, Incentive[]>;
  incentivesAll?: IncentiveCategory[];
  incentivesSelected?: IncentiveCategory[];
  incentivesFound?: Record<string, Incentive[]>;
  isEstimating: boolean;
  isEstimationError: boolean;
  isSearching: boolean;
  isSearchError: boolean;
  physicalAddress?: AddressPhysical;
  solarData?: SolarData;
  productsAll?: Record<IncentiveType, Product[] | undefined>;
  productsSelected?: Record<IncentiveType, Product | undefined>;
}>({
  productsAll: {
    [IncentiveType.Solar]: undefined,
    [IncentiveType.Wind]: undefined,
    [IncentiveType.ElectricVehicles]: undefined,
    [IncentiveType.Geothermal]: undefined,
    [IncentiveType.Other]: undefined,
    [IncentiveType.EnergyEfficiency]: undefined,
  },
  isEstimationError: false,
  isEstimating: false,
  isSearchError: false,
  isSearching: false,
});

export const AppDispatchContext = createContext<{
  onChangeArea: (area: number) => void;
  onChangeIncentives: (incentive: IncentiveCategory) => void;
  onChangeProduct: (type: IncentiveCategory, product: Product) => void;
  onRequestEstimate: () => void;
  onRequestIncentives: () => void;
}>({
  onChangeArea: () => {},
  onChangeIncentives: () => {},
  onChangeProduct: () => {},
  onRequestEstimate: () => {},
  onRequestIncentives: () => {},
});

const round = (num: number) => Math.round(num * 100) / 100;

export const AppContextProvider = ({
  children,
  incentivesAll,
  physicalAddress,
  solarData,
}: PropsWithChildren & {
  incentivesAll?: IncentiveCategory[];
  physicalAddress: AddressPhysical;
  solarData?: SolarData;
}) => {
  const [area, setArea] = useState<{
    meters: number;
    feet: number;
  }>();
  const [incentivesSelected, setIncentivesSelected] = useState<
    IncentiveCategory[]
  >([]);
  const [productsSelected, setProductsSelected] = useState<
    Record<IncentiveType, Product | undefined>
  >({
    [IncentiveType.Solar]: undefined,
    [IncentiveType.Wind]: undefined,
    [IncentiveType.Geothermal]: undefined,
    [IncentiveType.EnergyEfficiency]: undefined,
    [IncentiveType.ElectricVehicles]: undefined,
    [IncentiveType.Other]: undefined,
  });

  const {
    data: estimatesFound,
    isError: isEstimationError,
    isLoading: isEstimating,
    refetch: onRequestEstimate,
  } = useQuery<string>({
    queryKey: ["estimate"],
    queryFn: () =>
      getEstimates(
        solarData?.solarradiation ?? 0,
        area?.meters,
        0,
        productsSelected[IncentiveType.Solar]
      ),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  console.log({ productsSelected });

  const {
    data: incentivesFound,
    isError: isSearchError,
    isLoading: isSearching,
    refetch: onRequestIncentives,
  } = useQuery<string>({
    queryKey: ["estimate"],
    queryFn: () => getIncentives(incentivesSelected, physicalAddress),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const onChangeArea = (a: number) => {
    const meters = round(a);
    const feet = round(a / 0.3048);
    setArea({ meters, feet });
  };

  const onChangeIncentives = (incentive: IncentiveCategory) => {
    if (incentivesSelected.map((i) => i.id).includes(incentive.id)) {
      setIncentivesSelected(incentivesSelected.filter((i) => i !== incentive));
    } else {
      setIncentivesSelected([...incentivesSelected, incentive]);
    }
  };

  const onChangeProduct = (incentive: IncentiveCategory, product: Product) => {
    setProductsSelected({
      ...(productsSelected || {}),
      [incentive.type]: product,
    });
  };

  return (
    <AppContext.Provider
      value={{
        area,
        estimatesFound: JSON.parse(estimatesFound || "{}"),
        incentivesAll,
        incentivesFound: JSON.parse(incentivesFound || "{}"),
        incentivesSelected,
        isEstimating,
        isEstimationError,
        isSearching,
        isSearchError,
        physicalAddress,
        solarData,
        productsSelected,
      }}
    >
      <AppDispatchContext.Provider
        value={{
          onChangeArea,
          onChangeIncentives,
          onChangeProduct,
          onRequestEstimate,
          onRequestIncentives,
        }}
      >
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};
