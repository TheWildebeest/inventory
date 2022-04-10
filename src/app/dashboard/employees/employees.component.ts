import { updateIndividualEmployee } from '@actions';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Device, Employee } from '@models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  @Input() devices: Device[]|null = null;
  @Input() employees: Employee[]|null = null;

  formGroup: FormGroup | null = null;

  constructor(
    private store: Store
  ) { }

  /**
   * Build a list of device objects from an array of device ids.
   * Allows the child component to render the device details.
   * @param {Device['id'][]} deviceIds
   * @returns {Device[]}
   */
  public getDeviceDetails(deviceIds: Device['id'][]): Device[] {
    if (!this.devices) return [];
    const deviceList: Device[] = deviceIds.map((id: Device['id']) => {
      return this.devices!.filter((device: Device) => device.id === id)[0];
    });
    return deviceList;
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
