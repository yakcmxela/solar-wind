import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
  return json({
    zip: params.zip,
  });
}

export default function () {
  const { zip } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Search by zip code</h1>
      <code>zip code: {zip}</code>
    </main>
  );
}
