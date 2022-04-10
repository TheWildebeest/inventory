import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Employee } from '@models';
import { DeviceEmployeeLink } from '@models/_device-employee-link.model';

export const LOAD_DEVICE_EMPLOYEE_LINKS = '[DeviceEmployeeLinks] Load device-employee links';
export const LOAD_DEVICE_EMPLOYEE_LINKS_SUCCESS = '[DeviceEmployeeLinks] Load device-employee links success';
export const LOAD_DEVICE_EMPLOYEE_LINKS_FAIL = '[DeviceEmployeeLinks] Load device-employee links fail';
export const CLEAR_DEVICE_EMPLOYEE_LINKS = '[DeviceEmployeeLinks] Clear device-employee links';

export const loadDeviceEmployeeLinks = createAction(
  LOAD_DEVICE_EMPLOYEE_LINKS
);

export const loadDeviceEmployeeLinksSuccess = createAction(
  LOAD_DEVICE_EMPLOYEE_LINKS_SUCCESS,
  props<{ data: DeviceEmployeeLink[]}>()
);

export const loadDeviceEmployeeLinksFail = createAction(
  LOAD_DEVICE_EMPLOYEE_LINKS_FAIL
);

export const clearDeviceEmployeeLinks = createAction(
  CLEAR_DEVICE_EMPLOYEE_LINKS
);

export type LoadDeviceEmployeeLinksAction = TypedAction<typeof LOAD_DEVICE_EMPLOYEE_LINKS>;
export type LoadDeviceEmployeeLinksSuccessAction = { data: Employee[] } & TypedAction<typeof LOAD_DEVICE_EMPLOYEE_LINKS_SUCCESS>;
export type LoadDeviceEmployeeLinksFailAction = TypedAction<typeof LOAD_DEVICE_EMPLOYEE_LINKS_FAIL>;
export type ClearDeviceEmployeeLinksAction = TypedAction<typeof CLEAR_DEVICE_EMPLOYEE_LINKS>;


