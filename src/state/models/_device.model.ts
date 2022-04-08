import { Employee } from "./_employee.model"

export interface InventoryItem {
  sku: string;
  type: DeviceTypes;
  description: string;
  image: string;
  name: string;
}

export interface Device extends InventoryItem {
  id: number;
}

export enum DeviceTypes {
  LAPTOP,
  TABLET,
  MOBILE,
  OTHER
}
