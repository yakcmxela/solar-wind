import { useState } from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";

import { Select } from "~ui/forms/Select";
import { Input } from "~ui/forms/Input";
import { Button } from "~ui/buttons/Button";
import { Card } from "../ui/cards/Card";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  if (body.has("mac")) {
    return redirect(`/station/${body.get("mac")}`);
  } else {
    return redirect(`/region/${body.get("zip")}`);
  }
}

enum QueryType {
  MAC = "mac",
  ZIP = "zip",
}

export default function Index() {
  const [queryType, setQueryType] = useState<QueryType>(QueryType.MAC);

  const onChangeQueryType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryType(e.target.value as QueryType);
  };

  return (
    <main className="container flex flex-col items-center justify-center min-h-[100vh]">
      <h1 className="text-4xl font-bold text-center my-8">Solar &amp; Wind Estimator</h1>
      <Card className="w-[500px] mx-auto flex flex-col items-center text-center">
        <p className="my-4">
          Either enter your Ambient Weather Network station's MAC address, or
          provide a postal code.
        </p>
        <Select
          className="my-2 w-full"
          onChange={onChangeQueryType}
          options={[
            { id: QueryType.MAC, value: QueryType.MAC, label: "MAC Address" },
            { id: QueryType.ZIP, value: QueryType.ZIP, label: "Zip Code" },
          ]}
        />
        <Form className="flex flex-col items-start w-full" method="post">
          {queryType === QueryType.MAC ? (
            <Input
              className="my-2 w-full"
              label="Enter your station's MAC address:"
              labelStyle="w-full"
              labelType="hidden"
              type="text"
              placeholder="00:11:22:33:44:55"
              name={queryType}
            />
          ) : (
            <Input
              className="my-2 w-full"
              label="Enter your zip code:"
              labelStyle="w-full"
              labelType="hidden"
              type="text"
              placeholder="12345"
              name={queryType}
            />
          )}
          <Button className="my-2 w-full" type="submit">
            Search
          </Button>
        </Form>
      </Card>
    </main>
  );
}
