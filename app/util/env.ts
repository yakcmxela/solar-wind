export const getEnv = (): Record<string, string | undefined> => {
  if (typeof window === "undefined") return process.env;
  if (typeof window !== "undefined") return window.ENV;
  return {};
};
