import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Employee } from '@models';

export const LOAD_EMPLOYEES = '[Employees] Load employees';
export const LOAD_EMPLOYEES_SUCCESS = '[Employees] Load employees success';
export const LOAD_EMPLOYEES_FAIL = '[Employees] Load employees fail';
export const CLEAR_EMPLOYEES = '[Employees] Clear employees';

export const loadEmployees = createAction(
  LOAD_EMPLOYEES
);

export const loadEmployeesSuccess = createAction(
  LOAD_EMPLOYEES_SUCCESS,
  props<{ data: Employee[]}>()
);

export const loadEmployeesFail = createAction(
  LOAD_EMPLOYEES_FAIL
);

export const clearEmployees = createAction(
  CLEAR_EMPLOYEES
);

export type LoadEmployeesAction = TypedAction<typeof LOAD_EMPLOYEES>;
export type LoadEmployeesSuccessAction = { data: Employee[] } & TypedAction<typeof LOAD_EMPLOYEES_SUCCESS>;
export type LoadEmployeesFailAction = TypedAction<typeof LOAD_EMPLOYEES_FAIL>;


