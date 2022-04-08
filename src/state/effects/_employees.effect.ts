// Angular
import { Injectable } from '@angular/core';

// Third party libraries
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

// Custom
import { LoadEmployeesAction, loadEmployeesFail, loadEmployeesSuccess, LOAD_EMPLOYEES } from '@actions/_employees.action';
import { Device, Employee } from '@models';
import { DataService } from '../services';

@Injectable()
export class EmployeesEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService
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
}