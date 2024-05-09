import { useState } from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";

import { Select } from "~ui/forms/Select";
import { Input } from "~ui/forms/Input";
import { Button } from "~ui/buttons/Button";
import { Card } from "../ui/cards/Card";
import { AddressPhysicalParts, AddressSearchType } from "~types/Address";
import { MapAddressAutofill } from "~ui/maps/MapAddressAutofill";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  if (body.has(AddressSearchType.MAC)) {
    return redirect(`/station/${body.get(AddressSearchType.MAC)}`);
  } else {
    const params = new URLSearchParams({
      street: body.get(AddressPhysicalParts.street) as string,
      city: body.get(AddressPhysicalParts.city) as string,
      state: body.get(AddressPhysicalParts.state) as string,
      zipcode: body.get(AddressPhysicalParts.zipcode) as string,
      country: body.get(AddressPhysicalParts.country) as string,
    });
    return redirect(`/physical-address?${params.toString()}`);
  }
}

export default function Index() {
  const [searchRequestType, setAddressSearchType] = useState<AddressSearchType>(
    AddressSearchType.MAC
  );

  const onChangeAddressSearchType = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAddressSearchType(e.target.value as AddressSearchType);
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
          onChange={onChangeAddressSearchType}
          options={[
            {
              id: AddressSearchType.MAC,
              value: AddressSearchType.MAC,
              label: AddressSearchType.MAC,
            },
            {
              id: AddressSearchType.Address,
              value: AddressSearchType.Address,
              label: AddressSearchType.Address,
            },
          ]}
        />
        <Form className="flex flex-col items-start w-full" method="post">
          {searchRequestType === AddressSearchType.MAC ? (
            <Input
              className="my-2 w-full"
              label="Enter your station's MAC address:"
              labelStyle="w-full"
              labelType="hidden"
              type="text"
              placeholder="00:11:22:33:44:55"
              name={AddressSearchType.MAC}
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
