import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  return json({
    mac: params.mac,
  });
}

export default function () {
  const { mac } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Search by your station's mac address</h1>
      <code>Mac address: {mac}</code>
    </main>
  );
}
