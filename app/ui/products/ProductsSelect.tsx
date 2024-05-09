import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AppContext, AppDispatchContext } from "~context/AppContext";
import { getProductByTypeID as getProductsByTypeID } from "~data/products";
import { IncentiveCategory } from "~types/Incentives";

export const ProductsSelect = ({
  incentive,
}: {
  incentive: IncentiveCategory;
}) => {
  const appContext = useContext(AppContext);
  const appDispatch = useContext(AppDispatchContext);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: [incentive.id],
    queryFn: () => getProductsByTypeID(incentive.id),
  });

  const onChangeProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!data) return;
    const productId = event.target.value;
    const product = data.find((p) => p.id === productId);
    if (product) {
      appDispatch.onChangeProduct(incentive, product);
    }
  };

  return (
    <>
      {isLoading && (
        <p className="text-sm">Loading {incentive.display_name} products...</p>
      )}
      {isError ||
        (isSuccess && !data.length && (
          <p className="text-sm">No {incentive.display_name} products found</p>
        ))}
      {isSuccess && data.length > 0 && (
        <>
          <label
            className="text-sm font-semibold"
            htmlFor={`${incentive.id}-products`}
          >
            Select a {incentive.display_name}
          </label>
          <div className="border border-slate-100 border-2">
            <select
              onChange={onChangeProduct}
              id={`${incentive.id}-products`}
              className="p-4 w-full text-sm"
            >
              <option value="">
                Select a {incentive.display_name} product
              </option>
              {data?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brand} - {p.name} ({p.efficiency_max}% efficiency)
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
};
