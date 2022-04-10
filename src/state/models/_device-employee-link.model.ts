import { Device } from "./_device.model";
import { Employee } from "./_employee.model";

export interface DeviceEmployeeLink {
  id: number;
  employeeId: Employee['id'];
  deviceId: Device['id'];
}

export interface LinkedDevice extends Device {
  linked: boolean;
}

export interface LinkedEmployee extends Employee {
  linked: boolean;
}

export interface EmployeeWithDevices extends Employee {
  linkedDevices: LinkedDevice[]
}