import { ButtonHTMLAttributes } from "react";
import { ButtonProps } from "./types";

export const Button = ({
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`${props.className} bg-slate-100 px-4 p-2 rounded min-w-[200px] max-w-full`}
    />
  );
};
