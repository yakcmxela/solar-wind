import { EstimatesResponse } from "~types/Estimates";
import { Product } from "~types/Products";

type EstimatesRequest = {
  lat: number;
  lng: number;
  solarPanelArea?: number;
  solarPanelProduct?: Product;
  windTurbineCount?: number;
  windTurbineProduct?: Product;
};

export async function getEstimates(
  req: EstimatesRequest
): Promise<EstimatesResponse | undefined> {
  const params = new URLSearchParams({
    solar_panel_area: (req.solarPanelArea || 0).toString(),
    solar_product_id: req.solarPanelProduct?.id ?? "",
    wind_turbine_count: (req.windTurbineCount || 0).toString(),
    wind_product_id: req.windTurbineProduct?.id ?? "",
    lat: req.lat.toString(),
    lng: req.lng.toString(),
  });
  const estimatesResponse = await fetch(
    `http://127.0.0.1:8000/estimates?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (estimatesResponse) {
    const estimate = await estimatesResponse.json();
    const parsed = JSON.parse(estimate.response || "{}");
    if (parsed) {
      return parsed;
    }
  } else {
    throw new Error("Estimates not found");
  }
}
