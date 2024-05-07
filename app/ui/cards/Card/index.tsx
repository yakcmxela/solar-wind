import { CardProps } from "./types";

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`shadow-lg p-6 rounded-lg bg-white overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};
