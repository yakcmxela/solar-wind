import { ButtonHTMLAttributes } from "react";
import { ButtonProps } from "./types";

export const Button = ({
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`bg-blue-500 px-4 p-2 rounded-lg min-w-[200px] max-w-full text-white font-bold ${props.className} `}
    />
  );
};
