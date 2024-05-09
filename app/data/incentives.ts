import { IncentiveCategory } from "~types/Incentives";
import { AddressPhysical } from "~types/Address";

export async function getIncentives(
  incentiveCategories: IncentiveCategory[],
  physicalAddress: AddressPhysical
): Promise<string> {
  const params = new URLSearchParams({
    ...physicalAddress,
    categories: incentiveCategories.join(","),
  });
  const incentivesResonse = await fetch(
    `http://127.0.0.1:8000/incentives?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const incentives: { response: string } = await incentivesResonse.json();
  if (incentives.response) {
    return incentives.response;
  }
  return "{}";
}

export async function getIncentiveTypes(): Promise<IncentiveCategory[]> {
  const incentiveResponse = await fetch(
    `http://127.0.0.1:8000/incentives/types`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const incentiveTypes: { response: IncentiveCategory[] } =
    await incentiveResponse.json();
  if (incentiveTypes) {
    return incentiveTypes.response;
  }
  return [];
}
