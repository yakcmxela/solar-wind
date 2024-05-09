export type AddressPhysical = {
  [AddressPhysicalParts.street]?: string;
  [AddressPhysicalParts.city]?: string;
  [AddressPhysicalParts.state]?: string;
  [AddressPhysicalParts.zipcode]?: string;
  [AddressPhysicalParts.country]?: string;
};

export enum AddressPhysicalParts {
  street = "street",
  city = "city",
  state = "state",
  zipcode = "zipcode",
  country = "country",
}

export enum AddressSearchType {
  MAC = "Station MAC Address",
  Address = "Physical Address",
}