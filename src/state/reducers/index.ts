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

export const reducers: ActionReducerMap<AppState> = {
  employeesState: employeesReducer,
  devicesState: devicesReducer,
  navBarState: navBarReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
