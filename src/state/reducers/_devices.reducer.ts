import { createReducer, on } from '@ngrx/store';
import { loadDevices, loadDevicesSuccess, loadDevicesFail, clearDevices, updateIndividualDevice, updateIndividualDeviceSuccess } from '@actions';
import { DevicesState, Device } from '@models';

export const initialState: DevicesState = {
  loaded: false,
  loading: false,
  data: null
};

export const devicesReducer = createReducer(
  initialState,
  on(loadDevices, (_state: DevicesState): DevicesState => {
    const newState = {
      loading: true,
      loaded: false,
      data: null
    };
    return newState;
  }),
  on(loadDevicesSuccess, (_state: DevicesState, props: { data: Device[] }): DevicesState => {
    const newState = {
      loading: false,
      loaded: true,
      data: [ ...props.data ]
    };
    return newState;
  }),
  on(loadDevicesFail, (_state: DevicesState): DevicesState => {
    const newState = {
      loading: true,
      loaded: false,
      data: [],
    };
    return newState;
  }),
  on(clearDevices, (_state: DevicesState): DevicesState => {
    return initialState;
  }),
  on(updateIndividualDevice, (state: DevicesState, _props: { data: Partial<Device> }): DevicesState => {
    return {
      loading: true,
      loaded: false,
      data: state.data? [ ...state.data ]: null
    };
  }),
  on(updateIndividualDeviceSuccess, (state: DevicesState, props: { data: Device }): DevicesState => {
    const newDevicesList: Device[] = state.data!
      .map((d: Device) => {
        if (d.id === props.data.id) {
          return props.data;
        }
        return d;
      });
    return {
      loading: true,
      loaded: false,
      data: newDevicesList
    };
  })
);