import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";

import { Select } from "@/ui/forms/Select";
import { useState } from "react";
import { Input } from "@/ui/forms/Input";
import { Button } from "@/ui/buttons/Button";

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
    <main>
      <h1 className="text-3xl my-4">Let's get some weather data</h1>
      <Select
        className="my-2"
        onChange={onChangeQueryType}
        options={[
          { id: QueryType.MAC, value: QueryType.MAC, label: "MAC Address" },
          { id: QueryType.ZIP, value: QueryType.ZIP, label: "Zip Code" },
        ]}
      />
      <Form className="flex flex-col items-start" method="post">
        {queryType === QueryType.MAC ? (
          <Input
            className="my-2"
            label="Enter your station's MAC address:"
            labelType="above"
            type="text"
            placeholder="00:11:22:33:44:55"
            name={queryType}
          />
        ) : (
          <Input
            className="my-2"
            label="Enter your zip code:"
            labelType="above"
            type="text"
            placeholder="12345"
            name={queryType}
          />
        )}
        <Button className="my-2" type="submit">
          Search
        </Button>
      </Form>
    </main>
  );
}
