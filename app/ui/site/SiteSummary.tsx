import { useContext } from "react";
import { AppContext } from "~context/AppContext";
import { PhysicalAddressParts } from "~types/PhysicalAddress";

export const SiteSummary = () => {
  const mapContext = useContext(AppContext);
  const physicalAddress = mapContext.physicalAddress || {};
  return (
    <section>
      <div className="bg-slate-100 rounded-lg p-4">
        <ul>
          <li className="text-sm">
            <strong>Country:</strong>{" "}
            {physicalAddress[PhysicalAddressParts.country]}
          </li>
          <li className="text-sm">
            <strong>Zip Code: </strong>
            {physicalAddress[PhysicalAddressParts.zipcode]}
          </li>
          <li className="text-sm">
            <strong>State: </strong>
            {physicalAddress[PhysicalAddressParts.state]}
          </li>
          <li className="text-sm">
            <strong>City: </strong>
            {physicalAddress[PhysicalAddressParts.city]}
          </li>
          <li className="text-sm">
            <strong>Street Address: </strong>
            {physicalAddress[PhysicalAddressParts.street]}
          </li>
        </ul>
      </div>
    </section>
  );
};
