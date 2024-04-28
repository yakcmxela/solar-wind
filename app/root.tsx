import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import appStyles from "~styles/app.css?url"
import tailwindStyles from "~styles/tailwind.css?url"
import mapboxStyles from 'mapbox-gl/dist/mapbox-gl.css?url';

declare global {
  interface Window {
    ENV: Record<string, string>;
  }
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "stylesheet", href: appStyles },
  { rel: "stylesheet", href: mapboxStyles },
]

export async function loader() {
  return json({
    ENV: {
      MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
    },
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html>
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
            )}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}