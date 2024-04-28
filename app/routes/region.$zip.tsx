import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSolarData, SolarData } from "@/data/solar";

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
        <main>
            <h1>Zip Code: {zipcode}</h1>
            <code>Radiation: {solarradiation}, UV: {uv}</code>
        </main>
    );
}