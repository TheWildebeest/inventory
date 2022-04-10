import { updateIndividualEmployee } from '@actions';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Device, DeviceEmployeeLink, Employee } from '@models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  @Input() devices: Device[]|null = null;
  @Input() employees: Employee[]|null = null;
  @Input() deviceEmployeeLinks: DeviceEmployeeLink[]|null = null;

  formGroup: FormGroup | null = null;

  constructor(
    private store: Store
  ) { }

  /**
   * Build a filtered list of devices specific to an employee from the device-employee links data.
   * Allows the child component to render the device details.
   * @param {Employee['id']} employeeId
   * @returns {Device[]}
   */
  public getLinkedDevices(employeeId: Employee['id']): Device[] {
    if (!this.deviceEmployeeLinks || !this.devices) return [];
    const linkedDevicesList: Device[] = this.deviceEmployeeLinks
      .filter((deviceEmployeeLink: DeviceEmployeeLink) => deviceEmployeeLink.employeeId === employeeId)
      .map(thing => { console.log(thing); return thing; })
      .map((link: DeviceEmployeeLink) => this.devices!.filter((device: Device) => device.id === link.deviceId)[0]);
      console.log(linkedDevicesList);
    return linkedDevicesList;
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
