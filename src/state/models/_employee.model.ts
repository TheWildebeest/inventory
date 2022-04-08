import { EmployeeDeviceLink } from "./_device.model";

export interface Employee {
  id: string;
  name: string,
  emailAddress: string,
  image: string,
  deviceLinks:  EmployeeDeviceLink[]
}