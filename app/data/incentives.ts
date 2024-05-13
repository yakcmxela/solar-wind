import { IncentiveCategory } from "~types/Incentives";
import { AddressPhysical } from "~types/Address";

export async function getIncentives(
  incentiveCategories: IncentiveCategory[],
  physicalAddress: AddressPhysical
): Promise<string> {
  const params = new URLSearchParams({
    ...physicalAddress,
    incentive_ids: incentiveCategories.map((c) => c.id).join(","),
  });
  const incentivesResonse = await fetch(
    `${process.env.API_URL}/incentives?${params.toString()}`,
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
    `${process.env.API_URL}/incentives/types`,
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
