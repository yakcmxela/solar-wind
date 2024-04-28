import { CardProps } from "./types";

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={`shadow-lg p-6 rounded-lg bg-white ${className}`}>{children}</div>
  );
};
