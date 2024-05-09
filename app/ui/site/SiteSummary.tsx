import { useContext } from "react";
import { AppContext } from "~context/AppContext";
import { AddressPhysicalParts } from "~types/Address";

export const SiteSummary = () => {
  const mapContext = useContext(AppContext);
  const physicalAddress = mapContext.physicalAddress || {};
  return (
    <section>
      <div className="bg-slate-100 rounded-lg p-4">
        <ul>
          <li className="text-sm">
            <strong>Country:</strong>{" "}
            {physicalAddress[AddressPhysicalParts.country]}
          </li>
          <li className="text-sm">
            <strong>Zip Code: </strong>
            {physicalAddress[AddressPhysicalParts.zipcode]}
          </li>
          <li className="text-sm">
            <strong>State: </strong>
            {physicalAddress[AddressPhysicalParts.state]}
          </li>
          <li className="text-sm">
            <strong>City: </strong>
            {physicalAddress[AddressPhysicalParts.city]}
          </li>
          <li className="text-sm">
            <strong>Street Address: </strong>
            {physicalAddress[AddressPhysicalParts.street]}
          </li>
        </ul>
      </div>
    </section>
  );
};
