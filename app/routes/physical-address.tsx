import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { AddressPhysical, AddressPhysicalParts } from "~types/Address";
import { AppContextProvider } from "~context/AppContext";
import { Card } from "~ui/cards/Card";
import { getIncentiveTypes } from "~data/incentives";
import { getProductByTypeID } from "~data/products";
import { getSolarData, SolarData } from "~data/solar";
import { Incentive, IncentiveCategory, IncentiveType } from "~types/Incentives";
import { IncentivesList } from "~ui/incentives/IncentivesList";
import { IncentivesSelect } from "~ui/incentives/IncentivesSelect";
import { Map } from "~ui/maps/Map";
import { Product } from "~types/Products";
import { ProductsSelect } from "~ui/products/ProductsSelect";
import { SiteCalculate } from "~ui/site/SiteCalculate";
import { SiteSize } from "~ui/site/SiteSize";
import { SiteSummary } from "~ui/site/SiteSummary";
import { SiteWeather } from "~ui/site/SiteWeather";
import { ProductsList } from "~ui/products/ProductsList";

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
    incentives?: IncentiveCategory[];
    windTurbines?: Product[];
  } = {
    physicalAddress: { street, city, state, zipcode, country },
  };

  try {
    const solarData = await getSolarData("111111");
    if (solarData) {
      data.solarData = solarData;
    }
  } catch (error) {
    console.error(error);
  }

  try {
    const incentives = await getIncentiveTypes();
    if (incentives) {
      data.incentives = incentives;
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

  const { physicalAddress, solarData, incentives } = data;

  return (
    <AppContextProvider
      incentivesAll={incentives}
      physicalAddress={physicalAddress}
      solarData={solarData}
    >
      <main>
        <article className="min-h-[100vh] container max-w-[900px] mx-auto pt-4 flex flex-col gap-4">
          <Card className=" flex !p-0 h-[40dvh]">
            <Map className="w-full h-full" />
            <SiteSize />
          </Card>
          <Card className="flex flex-col gap-4">
            <SiteSummary />
            <SiteWeather />
            <IncentivesSelect />
            <ProductsList />
            <SiteCalculate />
          </Card>
          <IncentivesList />
        </article>
      </main>
    </AppContextProvider>
  );
}
