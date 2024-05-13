import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import appFonts from "~styles/fonts.css?url";
import appStyles from "~styles/app.css?url";
import tailwindStyles from "~styles/tailwind.css?url";
import mapboxStyles from "mapbox-gl/dist/mapbox-gl.css?url";
import mapboxDrawStyles from "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css?url";

declare global {
  interface Window {
    ENV: Record<string, string>;
  }
}

const queryClient = new QueryClient();

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appFonts },
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: appStyles },
  { rel: "stylesheet", href: mapboxStyles },
  { rel: "stylesheet", href: mapboxDrawStyles },
];

export async function loader() {
  return json({
    ENV: {
      API_URL: process.env.API_URL,
      MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    },
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
