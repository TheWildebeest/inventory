// Angular
import { Injectable } from '@angular/core';

// Third party libraries
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

// Custom
import { LoadDevicesAction, loadDevicesFail, loadDevicesSuccess, LOAD_DEVICES, UpdateIndividualDeviceAction, updateIndividualDeviceFail, updateIndividualDeviceSuccess, UPDATE_INDIVIDUAL_DEVICE } from '@actions';
import { Device } from '@models';
import { DataService } from '@services';
import { selectDevicesData } from 'state/selectors';

@Injectable()
export class DevicesEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store
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
          );
      })
    );
  });

  updateIndividualEmployee$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UPDATE_INDIVIDUAL_DEVICE),
      concatLatestFrom(() => this.store.select(selectDevicesData)),
      switchMap(([action, devices]: [UpdateIndividualDeviceAction, Device[]|null]) => {
        return this.dataService.updateIndividualDevice(action.data, devices)
          .pipe(
            map((response: { data: Device|null}) => {
              if (response.data !== null) {
                return updateIndividualDeviceSuccess({ data: response.data });
              } else {
                return updateIndividualDeviceFail();
              }
            }),
            catchError(() => {
              return of(updateIndividualDeviceFail());
            })
          );
      })
    );
  });
}