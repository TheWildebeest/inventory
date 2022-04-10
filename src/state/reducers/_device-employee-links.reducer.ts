import { createReducer, on } from '@ngrx/store';
import { loadDeviceEmployeeLinks, loadDeviceEmployeeLinksSuccess, loadDeviceEmployeeLinksFail, clearDeviceEmployeeLinks, addNewDeviceEmployeeLink, addNewDeviceEmployeeLinkSuccess, addNewDeviceEmployeeLinkFail } from '@actions';
import { Device, DeviceEmployeeLinksState, Employee, DeviceEmployeeLink } from '@models';

export const initialState: DeviceEmployeeLinksState = {
  loaded: false,
  loading: false,
  data: null
};

export const deviceEmployeeLinksReducer = createReducer(
  initialState,
  on(loadDeviceEmployeeLinks, (_state: DeviceEmployeeLinksState): DeviceEmployeeLinksState => {
    const newState = {
      loading: true,
      loaded: false,
      data: null
    };
    return newState;
  }),
  on(loadDeviceEmployeeLinksSuccess, (_state: DeviceEmployeeLinksState, props: { data: DeviceEmployeeLink[] }): DeviceEmployeeLinksState => {
    const newState = {
      loading: false,
      loaded: true,
      data: [ ...props.data ]
    };
    return newState;
  }),
  on(loadDeviceEmployeeLinksFail, (_state: DeviceEmployeeLinksState): DeviceEmployeeLinksState => {
    const newState = {
      loading: true,
      loaded: false,
      data: [],
    };
    return newState;
  }),
  on(clearDeviceEmployeeLinks, (_state: DeviceEmployeeLinksState): DeviceEmployeeLinksState => {
    return initialState;
  }),
  on(addNewDeviceEmployeeLink, (state: DeviceEmployeeLinksState, _props: { data: { employeeId: Employee['id'], deviceId: Device['id'] } }): DeviceEmployeeLinksState => {
    const newState = {
      loading: true,
      loaded: false,
      data: state.data ? [ ...state.data ]: null,
    };
    return newState;
  }),
  on(addNewDeviceEmployeeLinkSuccess, (state: DeviceEmployeeLinksState, props: { data: DeviceEmployeeLink }): DeviceEmployeeLinksState => {
    console.log('reducer called.');
    const data = state.data ? [ ...state.data ] : [];
    data.push(props.data);
    const newState = {
      loading: false,
      loaded: true,
      data: data
    };
    return newState;
  }),
  on(addNewDeviceEmployeeLinkFail, (state: DeviceEmployeeLinksState): DeviceEmployeeLinksState => {
    const newState = {
      loading: false,
      loaded: true,
      data: state.data,
    };
    return newState;
  }),
);