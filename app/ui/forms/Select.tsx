import { InputHTMLAttributes, OptionHTMLAttributes } from "react";

export const Select = ({
  options,
  className,
  defaultOption,
  label,
  ...props
}: {
  defaultOption?: OptionHTMLAttributes<HTMLOptionElement>;
  label: string;
  options: OptionHTMLAttributes<HTMLOptionElement>[];
} & InputHTMLAttributes<HTMLSelectElement>) => {
  return (
    <label
      className={`border-2 border-slate-500 bg-slate-800 rounded-xl py-2 px-4 flex items-center ${className}`}
    >
      <span className="invisible absolute z-[-1]">{label}</span>
      <select
        {...props}
        className="w-full bg-transparent text-white font-semibold"
      >
        {defaultOption && <option {...defaultOption} />}
        {options.map((option) => (
          <option key={option.id} {...option} />
        ))}
      </select>
    </label>
  );
};
