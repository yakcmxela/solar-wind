import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSolarData, SolarData } from "~data/solar";
import { Card } from "~ui/cards/Card";
import { Map } from "~ui/maps/Map";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.zip) {
    throw new Response("Zip code is required", { status: 400 });
  }
  return await getSolarData(params.zip);
}

export default function SolarWeather() {
  const data = useLoaderData<SolarData | null>();

  if (!data) {
    return <div>No data available for this ZIP code.</div>;
  }

  const { solarradiation, uv, zipcode } = data; // Now safe to destructure

  return (
    <main className="min-h-[100vh] flex flex-col">
      <Map displayContext zip={zipcode} className="h-[50dvh]" />
      <section className="p-4 flex-grow flex flex-col">
        <Card className="flex-grow">
          <p>Solar Radiation: {solarradiation}</p>
          <p>UV Index: {uv}</p>
        </Card>
      </section>
    </main>
  );
}
