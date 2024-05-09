import { useContext } from "react";
import { AppContext } from "~context/AppContext";
import { ProductsSelect } from "./ProductsSelect";

export const ProductsList = () => {
  const appContext = useContext(AppContext);
  return (
    <ul>
      {appContext.incentivesSelected?.map((incentive) => (
        <li key={`${incentive.id}-products-list`}>
          <ProductsSelect incentive={incentive} />
        </li>
      ))}
    </ul>
  );
};
