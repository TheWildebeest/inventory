// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';

// Third party libraries
import { Store } from '@ngrx/store';
import { combineLatest, filter, forkJoin, Observable, Subscription, take } from 'rxjs';

// Custom
import { loadDevices, loadEmployees } from '@actions';
import { Device, DevicesState, Employee, EmployeesState } from '@models';
import { selectDevicesState, selectEmployeesState } from 'state';
import { PanelComponent } from './panel/panel.component';
import { DevicesComponent } from './devices/devices.component';
import { EmployeesComponent } from './employees/employees.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public devicesState$: Observable<DevicesState> | null = null;
  public employeesState$: Observable<EmployeesState> | null = null;
  public devices: Device[] | null = null;
  public employees: Employee[] | null = null;

  private subscription: Subscription = new Subscription();
  private childComponent: DevicesComponent|EmployeesComponent|null = null;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this._loadDevices();
    this._loadEmployees();
    this._setupSubscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public onActivate(component: PanelComponent|DevicesComponent|EmployeesComponent) {
    if (!(component instanceof PanelComponent)) {
      this.childComponent = component;
      this._passPropsToChildren();
    }
  }

  /**
   * Dispatches an action to load Devices into NGRX store
   * @returns {void}
   */
  private _loadDevices(): void {
    this.store.dispatch(loadDevices());
  }

  /**
   * Dispatches an action to load Employees into NGRX store
   * @returns {void}
   */
  private _loadEmployees(): void {
    this.store.dispatch(loadEmployees());
  }

  /**
   * Set up the data subscription and add teardown logic to component subscription
   * @returns {void}
   */
  private _setupSubscription(): void {
    this.devicesState$ = this.store.select(selectDevicesState);
    this.employeesState$ = this.store.select(selectEmployeesState);

    const dataSubscription: Subscription = combineLatest([
      this.devicesState$,
      this.employeesState$
    ])
    // .pipe(
    //   filter(([devicesState, employeesState]: [DevicesState, EmployeesState]) => {
    //     return devicesState && devicesState.data && employeesState && employeesState.data ? true : false
    //   }),
    //   take(1)
    // )
    .subscribe(([devicesState, employeesState]: [DevicesState, EmployeesState]) => {
      if (!devicesState.data || !employeesState.data) { return }
      this.devices = devicesState.data;
      this.employees = employeesState.data;
      this._passPropsToChildren();
    });
    this.subscription.add(dataSubscription);
  }

  private _passPropsToChildren(): void {
    if (this.childComponent === null) { return };
    if (!this.devices || !this.employees) { return };
    console.log(
      'Devices: ', this.devices,
      'Employees: ', this.employees
    )
    this.childComponent.devices = this.devices;
    this.childComponent.employees = this.employees;

  }

}
