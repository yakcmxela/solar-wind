import { useState } from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";

import { Select } from "~ui/forms/Select";
import { Input } from "~ui/forms/Input";
import { Button } from "~ui/buttons/Button";
import { Card } from "../ui/cards/Card";
import { SearchRequestType } from "~types/SearchRequestType";
import { MapAddressAutofill } from "~ui/maps/MapAddressAutofill";
import { PhysicalAddressParts } from "~types/PhysicalAddress";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  if (body.has(SearchRequestType.MAC)) {
    return redirect(`/station/${body.get(SearchRequestType.MAC)}`);
  } else {
    const params = new URLSearchParams({
      street: body.get(PhysicalAddressParts.street) as string,
      city: body.get(PhysicalAddressParts.city) as string,
      state: body.get(PhysicalAddressParts.state) as string,
      zipcode: body.get(PhysicalAddressParts.zipcode) as string,
      country: body.get(PhysicalAddressParts.country) as string,
    });
    return redirect(`/physical-address?${params.toString()}`);
  }
}

export default function Index() {
  const [searchRequestType, setSearchRequestType] = useState<SearchRequestType>(
    SearchRequestType.MAC
  );

  const onChangeSearchRequestType = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchRequestType(e.target.value as SearchRequestType);
  };

  return (
    <main className="container flex flex-col items-center justify-center min-h-[100vh]">
      <h1 className="text-4xl font-bold text-center my-8">
        Solar &amp; Wind Estimator
      </h1>
      <Card className="w-[500px] mx-auto flex flex-col items-center text-center">
        <p className="my-4">
          Either enter your Ambient Weather Network station's MAC address, or
          provide a postal code.
        </p>
        <Select
          className="my-2 w-full"
          onChange={onChangeSearchRequestType}
          options={[
            {
              id: SearchRequestType.MAC,
              value: SearchRequestType.MAC,
              label: SearchRequestType.MAC,
            },
            {
              id: SearchRequestType.Address,
              value: SearchRequestType.Address,
              label: SearchRequestType.Address,
            },
          ]}
        />
        <Form className="flex flex-col items-start w-full" method="post">
          {searchRequestType === SearchRequestType.MAC ? (
            <Input
              className="my-2 w-full"
              label="Enter your station's MAC address:"
              labelStyle="w-full"
              labelType="hidden"
              type="text"
              placeholder="00:11:22:33:44:55"
              name={SearchRequestType.MAC}
            />
          ) : (
            <MapAddressAutofill />
          )}
          <Button className="my-2 w-full" type="submit">
            Search
          </Button>
        </Form>
      </Card>
    </main>
  );
}
