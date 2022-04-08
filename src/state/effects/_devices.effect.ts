// Angular
import { Injectable } from '@angular/core';

// Third party libraries
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

// Custom
import { LoadDevicesAction, loadDevicesFail, loadDevicesSuccess, LOAD_DEVICES } from '@actions/_devices.action';
import { Device } from '@models';
import { DataService } from '@services';

@Injectable()
export class DevicesEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) { }

  loadDevices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_DEVICES),
      switchMap((_action: LoadDevicesAction) => {
        return this.dataService.getDevices()
          .pipe(
            map((devices: Device[]) => {
              return loadDevicesSuccess({ data: devices });
            }),
            catchError(() => {
              return of(loadDevicesFail());
            })
          )
      })
    );
  });
}