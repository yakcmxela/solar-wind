import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";

import { Input } from "@/ui/forms/Input";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  if (body.has("mac")) {
    return redirect(`/station/${body.get("mac")}`);
  } else {
    return redirect(`/region/${body.get("zip")}`);
  }
}

export default function Index() {
  return (
    <div>
      <h1>Let's get some weather data</h1>
      <Form method="post">
        <label>
          Enter your station's MAC address:
          <Input type="text" name="mac" />
        </label>
        <button type="submit">Submit</button>
      </Form>
      <p>-- or --</p>
      <Form method="post">
        <label>
          Enter your zip code:
          <Input type="text" name="zip" />
        </label>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
