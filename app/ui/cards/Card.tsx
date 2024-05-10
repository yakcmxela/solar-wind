import { ReactNode } from "react";

export const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`shadow-lg p-6 rounded-lg bg-white overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};
