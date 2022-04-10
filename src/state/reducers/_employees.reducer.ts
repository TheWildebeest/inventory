import { createReducer, on } from '@ngrx/store';
import { loadEmployees, loadEmployeesSuccess, loadEmployeesFail, clearEmployees, updateIndividualEmployee, updateIndividualEmployeeFail, updateIndividualEmployeeSuccess } from '@actions';
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
  on(updateIndividualEmployee, (_state: EmployeesState, _props: { data: Partial<Employee> }): EmployeesState => {
    const newState = {
      loading: true,
      loaded: false,
      data: _state.data
    };
    return newState;
  }),
  on(updateIndividualEmployeeSuccess, (state: EmployeesState, props: { data: Employee }): EmployeesState => {

    const newEmployeesList: Employee[] = state.data!
      .map((e: Employee) => {
        if (e.id === props.data.id) {
          return props.data;
        }
        return e;
      });
    const newState = {
      loading: false,
      loaded: true,
      data: newEmployeesList
    };
    return newState;
  }),
  on(updateIndividualEmployeeFail, (_state: EmployeesState): EmployeesState => {
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