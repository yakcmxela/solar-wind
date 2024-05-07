export type PhysicalAddress = {
  [PhysicalAddressParts.street]?: string;
  [PhysicalAddressParts.city]?: string;
  [PhysicalAddressParts.state]?: string;
  [PhysicalAddressParts.zipcode]?: string;
  [PhysicalAddressParts.country]?: string;
};

export enum PhysicalAddressParts {
  street = "street",
  city = "city",
  state = "state",
  zipcode = "zipcode",
  country = "country",
}
