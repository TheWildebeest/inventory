import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Employee } from '@models';

// Load

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
export type ClearEmployeesAction = TypedAction<typeof CLEAR_EMPLOYEES>;

// Update

export const UPDATE_INDIVIDUAL_EMPLOYEE = '[Employees] Update individual employee';
export const UPDATE_INDIVIDUAL_EMPLOYEE_SUCCESS = '[Employees] Update individual employee success';
export const UPDATE_INDIVIDUAL_EMPLOYEE_FAIL = '[Employees] Update individual employee fail';

export const updateIndividualEmployee = createAction(
  UPDATE_INDIVIDUAL_EMPLOYEE,
  props<{ data: Partial<Employee> }>()
);

export const updateIndividualEmployeeSuccess = createAction(
  UPDATE_INDIVIDUAL_EMPLOYEE_SUCCESS,
  props<{ data: Employee}>()
);

export const updateIndividualEmployeeFail = createAction(
  UPDATE_INDIVIDUAL_EMPLOYEE_FAIL
);

export type UpdateIndividualEmployeeAction = { data: Partial<Employee> } & TypedAction<typeof UPDATE_INDIVIDUAL_EMPLOYEE>;
export type UpdateIndividualEmployeeSuccessAction = { data: Employee } & TypedAction<typeof UPDATE_INDIVIDUAL_EMPLOYEE_SUCCESS>;
export type UpdateIndividualEmployeeFailAction = TypedAction<typeof UPDATE_INDIVIDUAL_EMPLOYEE_FAIL>;

