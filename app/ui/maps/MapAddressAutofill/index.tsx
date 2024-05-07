"use client";

import { lazy, Suspense, useState } from "react";
import { PhysicalAddress } from "~types/PhysicalAddress";
import { Input } from "~ui/forms/Input";

const LazyAddressAutoFill = lazy(() =>
  import("@mapbox/search-js-react").then((module) => ({
    default: module.AddressAutofill,
  }))
);

export const MapAddressAutofill = () => {
  const [address, setAddress] = useState<PhysicalAddress>();

  return (
    <Suspense fallback={null}>
      <style
        dangerouslySetInnerHTML={{
          __html: `mapbox-address-autofill { width: 100%; }`,
        }}
      />
      {/***
       * Adding a hidden element because the autofill is appending to the
       * name and messing up the form data. `name="Physical Address address-search"
       * */}
      <input className="hidden" name="street" value={address?.street ?? ""} />
      <input className="hidden" name="city" value={address?.city ?? ""} />
      <input className="hidden" name="state" value={address?.state ?? ""} />
      <input className="hidden" name="zipcode" value={address?.zipcode ?? ""} />
      <input className="hidden" name="country" value={address?.country ?? ""} />
      <LazyAddressAutoFill
        accessToken={window.ENV.MAPBOX_TOKEN}
        onRetrieve={
          // Inlining the function because module does not expose the type
          (res) => {
            const selected = res.features[0].properties;
            const physicalAddress: PhysicalAddress = {
              street: selected.address_line1,
              city: selected.address_level2,
              zipcode: selected.postcode,
              country: selected.country_code,
              state: selected.address_level1,
            };
            setAddress(physicalAddress);
          }
        }
      >
        <Input
          className="my-2 w-full"
          label="Enter your zip code:"
          labelStyle="w-full"
          labelType="hidden"
          type="text"
          placeholder="123 ABC St, City, State 12345"
        />
      </LazyAddressAutoFill>
    </Suspense>
  );
};
