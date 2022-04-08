import { createReducer, on } from '@ngrx/store';
import { loadEmployees, loadEmployeesSuccess, loadEmployeesFail, clearEmployees, updateEmployees, updateEmployeesFail, updateEmployeesSuccess } from '@actions';
import { Employee, EmployeesState } from '@models';

export const initialState: EmployeesState = {
  loaded: false,
  loading: false,
  data: null
};

export const employeesReducer = createReducer(
  initialState,
  on(loadEmployees, (_state: EmployeesState): EmployeesState => {
    const newState = {
      loading: true,
      loaded: false,
      data: null
    };
    return newState;
  }),
  on(loadEmployeesSuccess, (_state: EmployeesState, props: { data: Employee[] }): EmployeesState => {
    const newState = {
      loading: false,
      loaded: true,
      data: [ ...props.data ]
    };
    return newState;
  }),
  on(loadEmployeesFail, (_state: EmployeesState): EmployeesState => {
    const newState = {
      loading: true,
      loaded: false,
      data: [],
    };
    return newState;
  }),
  on(updateEmployees, (_state: EmployeesState, _props: { data: Partial<Employee> }): EmployeesState => {
    const newState = {
      loading: true,
      loaded: false,
      data: _state.data
    };
    return newState;
  }),
  on(updateEmployeesSuccess, (_state: EmployeesState, props: { data: Employee[] }): EmployeesState => {
    const newState = {
      loading: false,
      loaded: true,
      data: [ ...props.data ]
    };
    return newState;
  }),
  on(updateEmployeesFail, (_state: EmployeesState): EmployeesState => {
    const newState = {
      loading: true,
      loaded: false,
      data: [],
    };
    return newState;
  }),
  on(clearEmployees, (_state: EmployeesState): EmployeesState => {
    return initialState;
  }),
);