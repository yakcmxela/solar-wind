import { IncentiveCategory } from "~types/IncentiveCategory";
import { PhysicalAddress } from "~types/PhysicalAddress";

export async function getIncentives(
  incentiveCategories: IncentiveCategory[],
  physicalAddress: PhysicalAddress
): Promise<string> {
  console.log(incentiveCategories);
  const params = new URLSearchParams({
    ...physicalAddress,
    categories: incentiveCategories.join(","),
  });
  console.log(`http://127.0.0.1:8000/incentives?${params.toString()}`);
  const solarRebateResponse = await fetch(
    `http://127.0.0.1:8000/incentives?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const solarRebates: { response: string } = await solarRebateResponse.json();
  if (solarRebates.response) {
    return solarRebates.response;
  }
  return "No solar rebates found";
}
