import { updateIndividualEmployee } from '@actions';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Device, DeviceEmployeeLink, Employee, EmployeeWithDevices, LinkedDevice } from '@models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {

  @Input() devices: Device[]|null = null;
  @Input() employees: Employee[]|null = null;
  @Input() deviceEmployeeLinks: DeviceEmployeeLink[]|null = null;

  public employeeCards: EmployeeWithDevices[]|null = null;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    if (!this.devices || !this.employees || !this.deviceEmployeeLinks) return;
    this.employeeCards = this.employees
      .map((employee: Employee) => {
        const linkedDeviceIds: Device['id'][] = this.deviceEmployeeLinks!
        .filter(d => d.employeeId === employee.id)
        .map(d => d.deviceId);
  
        const employeeDeviceList: LinkedDevice[] = this.devices!
          .map((device: Device) => {
            return {
              ...device,
              linked: linkedDeviceIds.includes(device.id)
            };
          });
          return {
            ...employee,
            linkedDevices: employeeDeviceList
          };
      });
  }

  /**
   * Dispatches an action to update an employee's details
   * @param {Partial<Employee>} employeeDetails
   * @returns {void}
   */
  public onEmployeeChanged(employeeDetails: Partial<Employee>): void {
    this.store.dispatch(updateIndividualEmployee({
      data: employeeDetails
    }));
  }




}
