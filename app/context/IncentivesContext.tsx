import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useState } from "react";
import { getIncentives } from "~data/incentives";

import { Incentive, IncentiveCategory, IncentiveType } from "~types/Incentives";
import { AddressPhysical } from "~types/Address";
import { Product } from "~types/Products";

export const IncentivesContext = createContext<{
  incentivesSelected?: IncentiveCategory[];
  incentivesFound?: Record<string, Incentive[]>;
  isSearching: boolean;
  isSearchError: boolean;
}>({
  isSearchError: false,
  isSearching: false,
});

export const IncentivesDispatchContext = createContext<{
  onChangeIncentives: (incentive: IncentiveCategory) => void;
  onRequestIncentives: () => void;
}>({
  onChangeIncentives: () => {},
  onRequestIncentives: () => {},
});

export const IncentivesContextProvider = ({
  children,
  physicalAddress,
}: PropsWithChildren & {
  physicalAddress: AddressPhysical;
}) => {
  const [incentivesSelected, setIncentivesSelected] = useState<
    IncentiveCategory[]
  >([]);

  const {
    data: incentivesFound,
    isError: isSearchError,
    isLoading,
    isFetching,
    refetch: onRequestIncentives,
  } = useQuery<string>({
    queryKey: ["estimate"],
    queryFn: () => getIncentives(incentivesSelected, physicalAddress),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const onChangeIncentives = (incentive: IncentiveCategory) => {
    if (incentivesSelected.map((i) => i.id).includes(incentive.id)) {
      setIncentivesSelected(incentivesSelected.filter((i) => i !== incentive));
    } else {
      setIncentivesSelected([...incentivesSelected, incentive]);
    }
  };

  return (
    <IncentivesContext.Provider
      value={{
        incentivesFound: JSON.parse(incentivesFound || "{}"),
        incentivesSelected,
        isSearching: isLoading || isFetching,
        isSearchError,
      }}
    >
      <IncentivesDispatchContext.Provider
        value={{
          onChangeIncentives,
          onRequestIncentives,
        }}
      >
        {children}
      </IncentivesDispatchContext.Provider>
    </IncentivesContext.Provider>
  );
};
