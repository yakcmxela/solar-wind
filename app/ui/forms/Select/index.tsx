import { InputHTMLAttributes } from "react";
import { SelectProps } from "./types";

export const Select = ({
  options,
  className,
  ...props
}: SelectProps & InputHTMLAttributes<HTMLSelectElement>) => {
  return (
    <div className={`border-2 border-slate-500 rounded p-2 ${className}`}>
      <select {...props} className="w-full">
        {options.map((option) => (
          <option key={option.id} {...option} />
        ))}
      </select>
    </div>
  );
};
