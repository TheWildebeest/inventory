import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { NavBarState, EmployeesState, DevicesState, DeviceEmployeeLinksState } from '@models';

export const selectNavBar = createFeatureSelector<NavBarState>('navBarState');
export const selectEmployees = createFeatureSelector<EmployeesState>('employeesState');
export const selectDevices = createFeatureSelector<DevicesState>('devicesState');
export const selectDeviceEmployeeLinks = createFeatureSelector<DeviceEmployeeLinksState>('deviceEmployeeLinksState');

// Nav bar selectors

export const selectNavBarState = createSelector(
  selectNavBar,
  (state: NavBarState) => state
);

export const selectNavBarOpen = createSelector(
  selectNavBar,
  (state: NavBarState) => state.isOpen
);

export const selectNavBarClosed = createSelector(
  selectNavBar,
  (state: NavBarState) => state.isClosed
);

// Employees selectors

export const selectEmployeesState = createSelector(
  selectEmployees,
  (state: EmployeesState) => state
);

export const selectEmployeesData = createSelector(
  selectEmployees,
  (state: EmployeesState) => state.data
);

export const selectEmployeesLoaded = createSelector(
  selectEmployees,
  (state: EmployeesState) => state.loaded
);

export const selectEmployeesLoading = createSelector(
  selectEmployees,
  (state: EmployeesState) => state.loading
);

// Devices selectors

export const selectDevicesState = createSelector(
  selectDevices,
  (state: DevicesState) => state
);

export const selectDevicesData = createSelector(
  selectDevices,
  (state: DevicesState) => state.data
);

export const selectDevicesLoaded = createSelector(
  selectDevices,
  (state: DevicesState) => state.loaded
);

export const selectDevicesLoading = createSelector(
  selectDevices,
  (state: DevicesState) => state.loading
);

// Devices-Employee Links selectors

export const selectDeviceEmployeeLinksState = createSelector(
  selectDeviceEmployeeLinks,
  (state: DeviceEmployeeLinksState) => state
);

export const selectDeviceEmployeeLinksData = createSelector(
  selectDeviceEmployeeLinks,
  (state: DeviceEmployeeLinksState) => state.data
);

export const selectDeviceEmployeeLinksLoaded = createSelector(
  selectDeviceEmployeeLinks,
  (state: DeviceEmployeeLinksState) => state.loaded
);

export const selectDeviceEmployeeLinksLoading = createSelector(
  selectDeviceEmployeeLinks,
  (state: DeviceEmployeeLinksState) => state.loading
);


