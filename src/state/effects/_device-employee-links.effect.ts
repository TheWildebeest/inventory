// Angular
import { Injectable } from '@angular/core';

// Third party libraries
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

// Custom
import { DeviceEmployeeLink } from '@models';
import { DataService } from '@services';
import { AddNewDeviceEmployeeLinkAction, addNewDeviceEmployeeLinkFail, addNewDeviceEmployeeLinkSuccess, ADD_NEW_DEVICE_EMPLOYEE_LINK, LoadDeviceEmployeeLinksAction, loadDeviceEmployeeLinksFail, loadDeviceEmployeeLinksSuccess, LOAD_DEVICE_EMPLOYEE_LINKS, RemoveDeviceEmployeeLinkAction, removeDeviceEmployeeLinkFail, removeDeviceEmployeeLinkSuccess, REMOVE_DEVICE_EMPLOYEE_LINK } from '@actions';

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

  addDeviceEmployeeLink$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ADD_NEW_DEVICE_EMPLOYEE_LINK),
      mergeMap((action: AddNewDeviceEmployeeLinkAction) => {
        return this.dataService.addNewDeviceEmployeeLink(action.data)
          .pipe(
            map((response: { data: DeviceEmployeeLink }) => {
              return addNewDeviceEmployeeLinkSuccess({ data: response.data });
            }),
            catchError(() => {
              return of(addNewDeviceEmployeeLinkFail());
            })
          );
      })
    );
  });

  removeDeviceEmployeeLink$ = createEffect(() => {
    console.log('Remove device-employee link effect triggered.');
    
    return this.actions$.pipe(
      ofType(REMOVE_DEVICE_EMPLOYEE_LINK),
      mergeMap((action: RemoveDeviceEmployeeLinkAction) => {
        console.log(action.data);
        return this.dataService.removeDeviceEmployeeLink(action.data)
          .pipe(
            map((response: { data: { deleted: boolean } }) => {
              if (response.data.deleted) {
                return removeDeviceEmployeeLinkSuccess({ data: action.data });
              } else {
              return removeDeviceEmployeeLinkFail();
              }
            }),
            catchError(() => {
              return of(removeDeviceEmployeeLinkFail());
            })
          );
      })
    );
  });
}