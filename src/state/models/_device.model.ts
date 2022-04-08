import { Employee } from "./_employee.model"

export interface InventoryItem {
  sku: string;
  type: DeviceTypes;
  description: string;
  image: string;
  name: string;
}

export interface Device extends InventoryItem {
  id: string;
}

export interface EmployeeDeviceLink {
  deviceId: Device['id'];
  employeeId: Employee['id'];
  permissions: EmployeePermissions;
}

export enum EmployeePermissions {
  RESTRICTED,
  STANDARD,
  ADMINISTRATOR
}

export enum DeviceTypes {
  LAPTOP,
  TABLET,
  MOBILE,
  OTHER
}
