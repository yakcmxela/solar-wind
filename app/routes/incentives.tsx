import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

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

  const physicalAddress: AddressPhysical = {
    street,
    city,
    state,
    zipcode,
    country,
  };
  let incentives: IncentiveCategory[] | undefined;

  try {
    incentives = await getIncentiveTypes();
  } catch (error) {
    console.error(error);
  }

  return { physicalAddress, incentives };
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
        <article className="min-h-[100vh] container max-w-[900px] mx-auto p-6">
          <section className="flex flex-col items-center justify-center my-6">
            <h1 className="text-white text-4xl font-black my-4">Incentives</h1>
            <p className="text-white text-center max-w-[500px]">
              Let us know how you'd like to fight climate change, and we'll see
              what incentives exist for you!
            </p>
            <Link to="/" className="my-2 flex items-center text-orange-400">
              &larr; Start over
            </Link>
          </section>
          <section className="flex flex-col-reverse md:flex-row gap-4 w-full">
            <div className="flex-shrink-0 flex flex-col">
              <IncentivesSelect incentives={incentives} />
              <div className="mt-auto">
                <IncentivesSearch className="mt-8" />
              </div>
            </div>
            <Card className="flex-grow h-[300px] md:h-auto flex !p-0 flex-shrink-0">
              <MapBasic zoom={6} physicalAddress={physicalAddress} />
            </Card>
          </section>
          <IncentivesList />
        </article>
      </main>
    </IncentivesContextProvider>
  );
}
