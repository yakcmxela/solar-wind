import { getEnv } from "app/util/env";
import { Product } from "~types/Products";

export const getProductByTypeID = async (id: string): Promise<Product[]> => {
  const solarPanelsResponse = await fetch(
    `${getEnv().API_URL}/products/type_id/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const solarPanels: { response: Product[] } = await solarPanelsResponse.json();
  if (solarPanels) {
    return solarPanels.response;
  }
  return [];
};
