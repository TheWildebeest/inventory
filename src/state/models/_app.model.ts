import { Device } from './_device.model';
import { Employee } from './_employee.model';

export interface AppState {
  navBarState: NavBarState;
  employeesState: EmployeesState;
  devicesState: DevicesState;
} 

export interface NavBarState {
  loading: boolean,
  loaded: boolean,
  isOpen: boolean
  isClosed: boolean
}

export interface EmployeesState {
  loaded: boolean,
  loading: boolean,
  data: Employee[] | null; 
}

export interface DevicesState {
  loaded: boolean,
  loading: boolean,
  data: Device[] | null; 
}