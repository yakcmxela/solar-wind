export type EstimatesResponse = {
  power_out: {
    solar: number;
    wind: number;
    total: number;
  };
  units: string;
};
