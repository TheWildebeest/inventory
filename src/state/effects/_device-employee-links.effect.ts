// Angular
import { Injectable } from '@angular/core';

// Third party libraries
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

// Custom
import { DeviceEmployeeLink } from '@models';
import { DataService } from '@services';
import { LoadDeviceEmployeeLinksAction, loadDeviceEmployeeLinksFail, loadDeviceEmployeeLinksSuccess, LOAD_DEVICE_EMPLOYEE_LINKS } from '@actions';

@Injectable()
export class DeviceEmployeeLinksEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) { }

  loadDeviceEmployeeLinks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_DEVICE_EMPLOYEE_LINKS),
      switchMap((_action: LoadDeviceEmployeeLinksAction) => {
        return this.dataService.getDeviceEmployeeLinks()
          .pipe(
            map((response: DeviceEmployeeLink[]) => {
              return loadDeviceEmployeeLinksSuccess({ data: response });
            }),
            catchError(() => {
              return of(loadDeviceEmployeeLinksFail());
            })
          );
      })
    );
  });
}