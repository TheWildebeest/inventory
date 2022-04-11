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

// Update

export const UPDATE_INDIVIDUAL_DEVICE = '[Devices] Update individual device';
export const UPDATE_INDIVIDUAL_DEVICE_SUCCESS = '[Devices] Update individual device success';
export const UPDATE_INDIVIDUAL_DEVICE_FAIL = '[Devices] Update individual device fail';

export const updateIndividualDevice = createAction(
  UPDATE_INDIVIDUAL_DEVICE,
  props<{ data: Partial<Device> }>()
);

export const updateIndividualDeviceSuccess = createAction(
  UPDATE_INDIVIDUAL_DEVICE_SUCCESS,
  props<{ data: Device }>()
);

export const updateIndividualDeviceFail = createAction(
  UPDATE_INDIVIDUAL_DEVICE_FAIL
);

export type UpdateIndividualDeviceAction = { data: Partial<Device> } & TypedAction<typeof UPDATE_INDIVIDUAL_DEVICE>;
export type UpdateIndividualDeviceSuccessAction = { data: Device } & TypedAction<typeof UPDATE_INDIVIDUAL_DEVICE_SUCCESS>;
export type UpdateIndividualDeviceFailAction = TypedAction<typeof UPDATE_INDIVIDUAL_DEVICE_FAIL>;

