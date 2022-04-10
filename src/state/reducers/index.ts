import { AppState } from '@models';

import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

// Reducers

import { navBarReducer } from './_nav-bar.reducer';
import { employeesReducer } from './_employees.reducer';
import { devicesReducer } from './_devices.reducer';
import { deviceEmployeeLinksReducer } from './_device-employee-links.reducer';


export const reducers: ActionReducerMap<AppState> = {
  employeesState: employeesReducer,
  devicesState: devicesReducer,
  deviceEmployeeLinksState: deviceEmployeeLinksReducer,
  navBarState: navBarReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
