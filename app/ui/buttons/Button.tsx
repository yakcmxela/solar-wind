import { ButtonHTMLAttributes } from "react";

export const Button = ({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`hover:bg-cyan-500 md:hover:scale-[1.05] duration-150 bg-cyan-800 border-2 border-cyan-500 text-white px-4 py-3 rounded-full min-w-[200px] max-w-full font-bold ${props.className} `}
    />
  );
};
