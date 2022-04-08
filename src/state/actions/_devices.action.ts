import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Device, Employee } from '@models';

export const LOAD_DEVICES = '[Devices] Load devices';
export const LOAD_DEVICES_SUCCESS = '[Devices] Load devices success';
export const LOAD_DEVICES_FAIL = '[Devices] Load devices fail';
export const CLEAR_DEVICES = '[Devices] Clear devices';

export const loadDevices = createAction(
  LOAD_DEVICES
);

export const loadDevicesSuccess = createAction(
  LOAD_DEVICES_SUCCESS,
  props<{ data: Device[]}>()
);

export const loadDevicesFail = createAction(
  LOAD_DEVICES_FAIL
);

export const clearDevices = createAction(
  CLEAR_DEVICES
);

export type LoadDevicesAction = TypedAction<typeof LOAD_DEVICES>;
export type LoadDevicesSuccessAction = { data: Employee[] } & TypedAction<typeof LOAD_DEVICES_SUCCESS>;
export type LoadDevicesFailAction = TypedAction<typeof LOAD_DEVICES_FAIL>;


