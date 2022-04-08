import { createAction } from '@ngrx/store';

export const openNav = createAction(
  '[Nav Bar] Open nav bar',
);

export const closeNav = createAction(
  '[Nav Bar] Close nav bar'
);

export const closeNavSuccess = createAction(
  '[Nav Bar] Nav bar closed successfully'
);

export const openNavSuccess = createAction(
  '[Nav Bar] Nav bar opened successfully'
);