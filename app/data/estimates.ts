import { Product } from "~types/Products";
import { SolarData } from "./solar";

export async function getEstimates(
  solarradiation: SolarData["solarradiation"],
  area?: number,
  turbineCount?: number,
  solarProduct?: Product
): Promise<string> {
  const params = new URLSearchParams({
    solarradiation: solarradiation.toString(),
    area: (area || 0).toString(),
    solar_product_id: solarProduct?.id ?? "",
    turbineCount: (turbineCount || 0).toString(),
  });
  const estimatesResponse = await fetch(
    `http://127.0.0.1:8000/estimates?${params.toString()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (estimatesResponse) {
    const estimate = await estimatesResponse.json();
    return estimate.response;
  }
  return "{}";
}
