import { createReducer, on } from '@ngrx/store';

import { openNav, closeNav } from '@actions';
import { NavBarState } from '@models';

export const initialState: NavBarState = {
  loading: false,
  loaded: true,
  isOpen: false,
  isClosed: true
};

export const navBarReducer = createReducer(
  initialState,
  on(openNav, (_state: NavBarState): NavBarState => {
    return {
      loading: false,
      loaded: true,
      isOpen: true,
      isClosed: false
    };
  }),
  on(closeNav, (_state: NavBarState): NavBarState => {
    return {
      loading: false,
      loaded: true,
      isOpen: false,
      isClosed: true
    };
  }),
);