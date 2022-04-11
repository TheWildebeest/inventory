export interface Device {
  id: number;
  sku: string;
  type: DeviceTypes;
  description: string;
  image: string;
  name: string;
}

export enum DeviceTypes {
  LAPTOP,
  TABLET,
  MOBILE,
  OTHER
}
