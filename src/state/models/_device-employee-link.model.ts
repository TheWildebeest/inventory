import { Device } from "./_device.model";
import { Employee } from "./_employee.model";

export interface DeviceEmployeeLink {
  employeeId: Employee['id'],
  deviceId: Device['id']
}