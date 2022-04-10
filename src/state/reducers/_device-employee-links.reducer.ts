import { createReducer, on } from '@ngrx/store';
import { loadDeviceEmployeeLinks, loadDeviceEmployeeLinksSuccess, loadDeviceEmployeeLinksFail, clearDeviceEmployeeLinks } from '@actions';
import { DeviceEmployeeLinksState } from '@models';
import { DeviceEmployeeLink } from '@models/_device-employee-link.model';

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
);