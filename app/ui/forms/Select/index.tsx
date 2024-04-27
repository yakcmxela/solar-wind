import { InputHTMLAttributes } from "react";
import { SelectProps } from "./types";

export const Select = ({
  options,
  ...props
}: SelectProps & InputHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      {...props}
      className={`${props.className} border border-slate-500 rounded p-1`}
    >
      {options.map((option) => (
        <option key={option.id} {...option} />
      ))}
    </select>
  );
};
