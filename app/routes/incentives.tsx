import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { AddressPhysical, AddressPhysicalParts } from "~types/Address";
import { Card } from "~ui/cards/Card";
import { getIncentiveTypes } from "~data/incentives";
import { IncentiveCategory } from "~types/Incentives";
import { IncentivesList } from "~ui/incentives/IncentivesList";
import { IncentivesSelect } from "~ui/incentives/IncentivesSelect";
import { IncentivesContextProvider } from "~context/IncentivesContext";
import { IncentivesSearch } from "~ui/incentives/IncentivesSearch";
import { MapBasic } from "~ui/maps/MapBasic";

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);

  const street = searchParams.get(AddressPhysicalParts.street) || "";
  const city = searchParams.get(AddressPhysicalParts.city) || "";
  const state = searchParams.get(AddressPhysicalParts.state) || "";
  const zipcode = searchParams.get(AddressPhysicalParts.zipcode) || "";
  const country = searchParams.get(AddressPhysicalParts.country) || "";

  const data: {
    physicalAddress: AddressPhysical;
    incentives?: IncentiveCategory[];
  } = {
    physicalAddress: { street, city, state, zipcode, country },
  };

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

  const { physicalAddress, incentives = [] } = data;

  return (
    <IncentivesContextProvider physicalAddress={physicalAddress}>
      <main>
        <article className="min-h-[100vh] container max-w-[900px] mx-auto pt-4">
          <section className="flex flex-col items-center justify-center my-8">
            <h1 className="text-white text-4xl font-black my-4">Incentives</h1>
            <p className="text-white text-center max-w-[500px]">
              Let us know how you'd like to fight climate change, and we'll see
              what incentives exist for your area!
            </p>
          </section>

          <div className="flex gap-4 w-full">
            <div className="flex-shrink-0 flex flex-col">
              <IncentivesSelect incentives={incentives} />
              <IncentivesSearch className="mt-auto" />
            </div>
            <Card className="flex-grow flex !p-0 h-[40dvh] flex-shrink-0">
              <MapBasic zoom={6} physicalAddress={physicalAddress} />
            </Card>
          </div>
          <IncentivesList />
        </article>
      </main>
    </IncentivesContextProvider>
  );
}
