import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect, useLoaderData } from "@remix-run/react";

import { Button } from "~ui/buttons/Button";
import { Card } from "../ui/cards/Card";
import { AddressPhysicalParts } from "~types/Address";
import { MapSearchBox } from "~ui/maps/MapSearchBox";

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get("error");
  return { error };
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const address = {
    street: body.get(AddressPhysicalParts.street) as string,
    city: body.get(AddressPhysicalParts.city) as string,
    state: body.get(AddressPhysicalParts.state) as string,
    zipcode: body.get(AddressPhysicalParts.zipcode) as string,
    country: body.get(AddressPhysicalParts.country) as string,
  };
  if (Object.keys(address).length === 0)
    return redirect("/?error=Please enter a valid address.");

  const params = new URLSearchParams(address);
  const route = body.get("route") ?? "";

  return redirect(`/${route}?${params.toString()}`);
}

export default function Index() {
  const { error } = useLoaderData<typeof loader>();
  return (
    <main className="container flex flex-col items-center justify-center min-h-[100vh] p-6">
      <div className="w-[500px] max-w-full my-auto">
        <h1 className="text-3xl font-black text-center mb-4 text-white">
          Renewable Energy Assistant
        </h1>
        <Card className="text-center border-2 border-slate-100 p-6">
          <h2 className="text-lg font-bold mb-2 text-cyan-800">
            What is this tool?
          </h2>
          <p className="mb-2">
            <strong className="text-indigo-800">Find incentives:</strong> Your
            go-to guide for all the incentives governments offer for going
            green. From tax breaks to local rebates, it will uncover the savings
            you need to play your part.
          </p>
          <p className="mt-2">
            <strong className="text-indigo-800">Calulate potential:</strong>{" "}
            Ever wondered how much electricity you could generate at your home?
            This tool will help you find out. Simply search your address, plot
            your solar panels or wind turbines, and see the results.
          </p>
          <p></p>
        </Card>
        <Form className="mt-4" method="post">
          <MapSearchBox />
          <div className="mt-4 flex gap-x-4">
            <Button
              className="w-full"
              name="route"
              value="incentives"
              type="submit"
            >
              Find Incentives
            </Button>
            <Button
              className="w-full"
              name="route"
              value="potential"
              type="submit"
            >
              Calculate Potential
            </Button>
          </div>
          {error && (
            <p className="text-center text-orange-400 text-white my-4">
              {error}
            </p>
          )}
        </Form>
      </div>
      <div className="m-4 mt-auto text-center">
        <p className="text-sm">An AI driven shopping experience.</p>
        <p className="text-xs text-white">
          Created by{" "}
          <Link
            className="text-orange-400"
            to="https://github.com/yakcmxela"
            target="_blank"
          >
            Alex McKay
          </Link>
        </p>
      </div>
    </main>
  );
}
