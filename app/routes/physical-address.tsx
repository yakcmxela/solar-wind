import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";

import { AppContext, AppContextProvider } from "~context/AppContext";
import { Button } from "~ui/buttons/Button";
import { Card } from "~ui/cards/Card";
import { getSolarData, SolarData } from "~data/solar";
import { IncentiveCategory } from "~types/IncentiveCategory";
import { IncentivesList } from "~ui/incentives/IncentivesList";
import { Map } from "~ui/maps/Map";
import { PhysicalAddress, PhysicalAddressParts } from "~types/PhysicalAddress";
import { SiteSize } from "~ui/site/SiteSize";
import { SiteSummary } from "~ui/site/SiteSummary";
import { SiteWeather } from "~ui/site/SiteWeather";
import { SiteCalculate } from "~ui/site/SiteCalculate";

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);

  const street = searchParams.get(PhysicalAddressParts.street) || "";
  const city = searchParams.get(PhysicalAddressParts.city) || "";
  const state = searchParams.get(PhysicalAddressParts.state) || "";
  const zipcode = searchParams.get(PhysicalAddressParts.zipcode) || "";
  const country = searchParams.get(PhysicalAddressParts.country) || "";

  const data: {
    physicalAddress: PhysicalAddress;
    solarData?: SolarData;
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

  return data;
}

export default function SearchByLocation() {
  const data = useLoaderData<typeof loader>();

  if (!data) {
    return <div>No data available for this ZIP code.</div>;
  }

  const { physicalAddress, solarData } = data;

  const incentiveCategories = [
    IncentiveCategory.Solar,
    IncentiveCategory.Wind,
    IncentiveCategory.ElectricVehicles,
  ];

  return (
    <AppContextProvider
      incentiveCategories={incentiveCategories}
      physicalAddress={physicalAddress}
      solarData={solarData}
    >
      <main>
        <article className="min-h-[100vh] container mx-auto pt-4 flex flex-col gap-4">
          <section className="h-[40dvh] grid grid-cols-2 gap-4">
            <Card className="!p-0">
              <Map className="w-full h-full" />
            </Card>
            <Card className="flex flex-col gap-4">
              <SiteSummary />
              <SiteWeather />
              <SiteSize />
              <SiteCalculate />
            </Card>
          </section>
          <IncentivesList />
        </article>
      </main>
    </AppContextProvider>
  );
}
