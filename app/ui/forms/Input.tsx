import { InputHTMLAttributes } from "react";

export const Input = ({
  label,
  labelType,
  labelStyle,
  ...props
}: {
  label?: string;
  labelType?: "hidden" | "above" | "left";
  labelStyle?: string;
} & InputHTMLAttributes<HTMLInputElement>) => {
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
        className={`rounded-xl p-3 text-sm ${props.className} `}
      />
    </label>
  );
};
