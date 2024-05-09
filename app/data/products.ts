import { Product } from "~types/Products";

export const getProductByTypeID = async (id: string): Promise<Product[]> => {
  const solarPanelsResponse = await fetch(
    `http://127.0.0.1:8000/products/type/${id}`,
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
