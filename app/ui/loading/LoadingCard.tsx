export const LoadingCard = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-grow items-center justify-center rounded-lg bg-slate-300 animate-pulse ${
        className ?? ""
      }`}
    >
      <p className="font-bold italic text-white">{text}</p>
    </div>
  );
};
