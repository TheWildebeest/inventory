import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Device, Employee } from '@models';
import { DeviceEmployeeLink } from '@models/_device-employee-link.model';

export const LOAD_DEVICE_EMPLOYEE_LINKS = '[DeviceEmployeeLinks] Load links';
export const LOAD_DEVICE_EMPLOYEE_LINKS_SUCCESS = '[DeviceEmployeeLinks] Load links success';
export const LOAD_DEVICE_EMPLOYEE_LINKS_FAIL = '[DeviceEmployeeLinks] Load links fail';
export const CLEAR_DEVICE_EMPLOYEE_LINKS = '[DeviceEmployeeLinks] Clear links';

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

export const ADD_NEW_DEVICE_EMPLOYEE_LINK = '[DeviceEmployeeLinks] Add new link';
export const ADD_NEW_DEVICE_EMPLOYEE_LINK_SUCCESS = '[DeviceEmployeeLinks] Add new link success';
export const ADD_NEW_DEVICE_EMPLOYEE_LINK_FAIL = '[DeviceEmployeeLinks] Add new link fail';

export const addNewDeviceEmployeeLink = createAction(
  ADD_NEW_DEVICE_EMPLOYEE_LINK,
  props<{ data: { employeeId: Employee['id'], deviceId: Device['id'] } }>()
);

export const addNewDeviceEmployeeLinkSuccess = createAction(
  ADD_NEW_DEVICE_EMPLOYEE_LINK_SUCCESS,
  props<{ data: DeviceEmployeeLink }>()
);

export const addNewDeviceEmployeeLinkFail = createAction(
  ADD_NEW_DEVICE_EMPLOYEE_LINK_FAIL
);

export const REMOVE_DEVICE_EMPLOYEE_LINK = '[DeviceEmployeeLinks] Add new link';
export const REMOVE_DEVICE_EMPLOYEE_LINK_SUCCESS = '[DeviceEmployeeLinks] Add new link success';
export const REMOVE_DEVICE_EMPLOYEE_LINK_FAIL = '[DeviceEmployeeLinks] Add new link fail';

export const removeDeviceEmployeeLink = createAction(
  REMOVE_DEVICE_EMPLOYEE_LINK,
  props<{ data: DeviceEmployeeLink['id'] }>()
);

export const removeDeviceEmployeeLinkSuccess = createAction(
  REMOVE_DEVICE_EMPLOYEE_LINK_SUCCESS,
  props<{ data: DeviceEmployeeLink['id'] }>()
);

export const removeDeviceEmployeeLinkFail = createAction(
  REMOVE_DEVICE_EMPLOYEE_LINK_FAIL
);

export type LoadDeviceEmployeeLinksAction = TypedAction<typeof LOAD_DEVICE_EMPLOYEE_LINKS>;
export type LoadDeviceEmployeeLinksSuccessAction = { data: DeviceEmployeeLink[] } & TypedAction<typeof LOAD_DEVICE_EMPLOYEE_LINKS_SUCCESS>;
export type LoadDeviceEmployeeLinksFailAction = TypedAction<typeof LOAD_DEVICE_EMPLOYEE_LINKS_FAIL>;
export type ClearDeviceEmployeeLinksAction = TypedAction<typeof CLEAR_DEVICE_EMPLOYEE_LINKS>;

export type AddNewDeviceEmployeeLinkAction = { data: { employeeId: Employee['id'], deviceId: Device['id'] } } & TypedAction<typeof ADD_NEW_DEVICE_EMPLOYEE_LINK>;
export type AddNewDeviceEmployeeLinkSuccessAction = { data: DeviceEmployeeLink } & TypedAction<typeof ADD_NEW_DEVICE_EMPLOYEE_LINK_SUCCESS>;
export type AddNewDeviceEmployeeLinkFailAction = TypedAction<typeof ADD_NEW_DEVICE_EMPLOYEE_LINK_FAIL>;

export type RemoveDeviceEmployeeLinkAction = { data: DeviceEmployeeLink['id'] } & TypedAction<typeof REMOVE_DEVICE_EMPLOYEE_LINK>;
export type RemoveDeviceEmployeeLinkSuccessAction = { data: Employee[] } & TypedAction<typeof REMOVE_DEVICE_EMPLOYEE_LINK_SUCCESS>;
export type RemoveDeviceEmployeeLinkFailAction = TypedAction<typeof REMOVE_DEVICE_EMPLOYEE_LINK_FAIL>;

