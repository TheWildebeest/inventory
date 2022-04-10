// Angular
import { Injectable } from '@angular/core';

// Third party libraries
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

// Custom
import { LoadEmployeesAction, loadEmployeesFail, loadEmployeesSuccess, LOAD_EMPLOYEES,UpdateIndividualEmployeeAction, updateIndividualEmployeeFail, updateIndividualEmployeeSuccess, UPDATE_INDIVIDUAL_EMPLOYEE } from '@actions/_employees.action';
import { Employee } from '@models';
import { DataService } from '../services';
import { Store } from '@ngrx/store';
import { selectEmployeesData } from 'state/selectors';

@Injectable()
export class EmployeesEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store
  ) { }

  loadEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_EMPLOYEES),
      switchMap((_action: LoadEmployeesAction) => {
        return this.dataService.getEmployees()
          .pipe(
            map((employees: Employee[]) => {
              return loadEmployeesSuccess({ data: employees });
            }),
            catchError(() => {
              return of(loadEmployeesFail());
            })
          )
      })
    );
  });

  updateIndividualEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UPDATE_INDIVIDUAL_EMPLOYEE),
      concatLatestFrom(() => this.store.select(selectEmployeesData)),
      switchMap(([action, employees]: [UpdateIndividualEmployeeAction, Employee[]|null]) => {
        return this.dataService.updateIndividualEmployee(action.data, employees)
          .pipe(
            map((response: { data: Employee|null}) => {
              if (response.data !== null) {
                return updateIndividualEmployeeSuccess({ data: response.data });
              } else {
                return updateIndividualEmployeeFail();
              }
            }),
            catchError(() => {
              return of(updateIndividualEmployeeFail());
            })
          )
      })
    );
  });
}