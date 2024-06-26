import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { AddressPhysical, AddressPhysicalParts } from "~types/Address";
import { Card } from "~ui/cards/Card";
import { getProductByTypeID } from "~data/products";
import { SolarData } from "~data/solar";
import { IncentiveCategory, IncentiveType } from "~types/Incentives";
import { MapDraw } from "~ui/maps/MapDraw";
import { PotentialContextProvider } from "~context/PotentialContext";
import { Product } from "~types/Products";
import { ProductsSelect } from "~ui/products/ProductsSelect";
import { getIncentiveTypes } from "~data/incentives";
import { PotentialCalculate } from "~ui/potential/PotentialCalculate";
import { PotentialEstimates } from "~ui/potential/PotentialEstimates";

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);

  const street = searchParams.get(AddressPhysicalParts.street) || "";
  const city = searchParams.get(AddressPhysicalParts.city) || "";
  const state = searchParams.get(AddressPhysicalParts.state) || "";
  const zipcode = searchParams.get(AddressPhysicalParts.zipcode) || "";
  const country = searchParams.get(AddressPhysicalParts.country) || "";

  const data: {
    physicalAddress: AddressPhysical;
    solarData?: SolarData;
    windTurbines: Product[];
    solarPanels: Product[];
    solarIncentive?: IncentiveCategory;
    windIncentive?: IncentiveCategory;
  } = {
    physicalAddress: { street, city, state, zipcode, country },
    windTurbines: [],
    solarPanels: [],
  };

  try {
    const incentives = await getIncentiveTypes();

    const solarIncentive = incentives.find(
      (incentive) => incentive.type === IncentiveType.Solar
    );
    if (solarIncentive) {
      data.solarIncentive = solarIncentive;
      try {
        data.solarPanels = await getProductByTypeID(solarIncentive.id);
      } catch (error) {
        console.error(error);
      }
    }

    const windIncentive = incentives.find(
      (incentive) => incentive.type === IncentiveType.Wind
    );
    if (windIncentive) {
      data.windIncentive = windIncentive;
      try {
        data.windTurbines = await getProductByTypeID(windIncentive.id);
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }

  return data;
}

export default function SearchByLocation() {
  const data = useLoaderData<typeof loader>();

  if (!data) {
    return <div>No data available for this ZIP code.</div>;
  }

  const {
    physicalAddress,
    solarIncentive,
    solarPanels,
    windIncentive,
    windTurbines,
  } = data;

  return (
    <PotentialContextProvider>
      <main>
        <article className="min-h-[100vh] container max-w-[900px] mx-auto pt-4 flex flex-col gap-4 p-6">
          <section className="flex flex-col items-center justify-center my-6">
            <h1 className="text-white text-4xl font-black my-4">
              Energy Potential
            </h1>
            <p className="text-white text-center max-w-[500px]">
              Use the map below to create solar panel arrays and wind turbines
              to see how much energy you could generate at your location.
            </p>
            <Link to="/" className="my-2 flex items-center text-orange-400">
              &larr; Start over
            </Link>
          </section>
          <Card className=" flex !p-0 h-[400px]">
            <MapDraw
              physicalAddress={physicalAddress}
              className="w-full h-full"
            />
          </Card>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            {solarIncentive && (
              <ProductsSelect
                incentive={solarIncentive}
                products={solarPanels}
              />
            )}
            {windIncentive && (
              <ProductsSelect
                incentive={windIncentive}
                products={windTurbines}
              />
            )}
            <PotentialCalculate />
          </div>
          <PotentialEstimates />
        </article>
      </main>
    </PotentialContextProvider>
  );
}
