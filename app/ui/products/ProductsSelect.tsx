import { useContext } from "react";
import { PotentialDispatchContext } from "~context/PotentialContext";
import { IncentiveCategory } from "~types/Incentives";
import { Product } from "~types/Products";
import { Select } from "~ui/forms/Select";

export const ProductsSelect = ({
  incentive,
  products,
}: {
  incentive: IncentiveCategory;
  products: Product[];
}) => {
  const appDispatch = useContext(PotentialDispatchContext);

  const onChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = event.target.value;
    const product = products.find((p) => p.id === productId);
    if (product) {
      appDispatch.onChangeProduct(incentive, product);
    }
  };

  if (!products?.length) return null;

  return (
    <Select
      onChange={onChangeProduct}
      id={`${incentive}-products`}
      className="full text-sm"
      label={`Select a ${incentive.display_name} product`}
      defaultOption={{
        id: "",
        value: "",
        children: `Select a ${incentive.display_name} product`,
      }}
      options={products.map((p) => ({
        id: p.id,
        value: p.id,
        children: `${p.brand} - ${p.name} (${p.efficiency_max}% efficiency)`,
      }))}
    />
  );
};
