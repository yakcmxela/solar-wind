import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { AddressPhysical } from "~types/Address";
import { Input } from "~ui/forms/Input";

const SearchBox = lazy(() =>
  import("@mapbox/search-js-react").then((mod) => ({ default: mod.SearchBox }))
);

let isHydrating = true;

export const MapSearchBox = () => {
  const [address, setAddress] = useState<AddressPhysical>();
  const [enteredAddress, setEnteredAddress] = useState("");
  const [isHydrated, setIsHydrated] = useState(!isHydrating);

  const accessToken = useMemo(() => {
    if (typeof window === "undefined") return null;
    return window.ENV.MAPBOX_TOKEN;
  }, []);

  useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  }, []);

  return (
    <>
      {/***
       * Adding a hidden element because the autofill is appending to the
       * name and messing up the form data. `name="Physical Address address-search"
       * */}
      <input
        readOnly
        className="hidden"
        name="street"
        value={address?.street ?? ""}
      />
      <input
        readOnly
        className="hidden"
        name="city"
        value={address?.city ?? ""}
      />
      <input
        readOnly
        className="hidden"
        name="state"
        value={address?.state ?? ""}
      />
      <input
        readOnly
        className="hidden"
        name="zipcode"
        value={address?.zipcode ?? ""}
      />
      <input
        readOnly
        className="hidden"
        name="country"
        value={address?.country ?? ""}
      />
      {isHydrated && accessToken ? (
        <SearchBox
          accessToken={accessToken}
          onSuggestError={(error) => console.error(error)}
          value={enteredAddress}
          placeholder="123 ABC St, City, State 12345"
          theme={{
            cssText: `
            .SearchBox {
              border-radius: 12px;
            }
            .Input { 
              width: 100%;
              height: 44px;
            }
          `,
          }}
          options={{
            country: "us",
            language: "en",
          }}
          onRetrieve={
            // Inlining the function because module does not expose the type
            (res) => {
              const selected = res.features[0].properties;
              setEnteredAddress(selected.full_address);
              setAddress({
                street: selected.context.address?.name ?? "",
                city: selected.context.place?.name ?? "",
                zipcode: selected.context.postcode?.name ?? "",
                country: selected.context.country?.name ?? "",
                state: selected.context.region?.name ?? "",
              });
            }
          }
        />
      ) : (
        <Input className="w-full" placeholder="" />
      )}
    </>
  );
};
