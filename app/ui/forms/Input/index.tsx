import { InputHTMLAttributes } from "react";
import { InputProps } from "./types";

export const Input = ({
  label,
  labelType,
  labelStyle,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) => {
  const styles =
    labelType === "above"
      ? "block"
      : labelType === "hidden"
      ? "invisible absolute z-[-1]"
      : "";
  return (
    <label className={`relative ${labelStyle}`}>
      <span className={`${styles} ${labelStyle}`}>{label}</span>
      <input
        {...props}
        className={`border-2 border-slate-500 rounded p-2 ${props.className} `}
      />
    </label>
  );
};
