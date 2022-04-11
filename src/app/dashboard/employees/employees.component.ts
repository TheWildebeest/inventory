import { addNewDeviceEmployeeLink, removeDeviceEmployeeLink, updateIndividualEmployee } from '@actions';
import { Component, Input } from '@angular/core';
import { Device, DeviceEmployeeLink, Employee, EmployeeWithDevices, LinkedDevice } from '@models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent {

  @Input() devices: Device[]|null = null;
  @Input() employees: Employee[]|null = null;
  @Input() deviceEmployeeLinks: DeviceEmployeeLink[]|null = null;

  constructor(
    private store: Store
  ) { }

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

  /**
   * Compares the updated devices list with the original list and dispatches add/remove events as needed.
   * @param {{ employeeId: Employee['id'], linkedDeviceIds: Device['id'][]}} _event 
   */
  public onLinkedDevicesChanged(_event: { employeeId: Employee['id'], linkedDeviceIds: Device['id'][]}) {
    const linksToDelete: DeviceEmployeeLink['id'][] = [];
    const linksToAdd: { deviceId: Device['id'], employeeId: Employee['id'] }[] = [];
    // Get the original list of device-employee links for this employee.
    const oldEmployeeDeviceList = this.deviceEmployeeLinks
      ?.filter((link: DeviceEmployeeLink) => link.employeeId === _event.employeeId);

    // If there were no linked devices before and nothing has changed, we can return here.
    if (_event.linkedDeviceIds.length === 0 && (!oldEmployeeDeviceList || !oldEmployeeDeviceList[0])) {
      return;
    }

    // Loop through the old list and see if anything has been deleted in the new list
    oldEmployeeDeviceList?.forEach((link: DeviceEmployeeLink) => {
      if (!_event.linkedDeviceIds.includes(link.deviceId)) {
        console.log(link);
        linksToDelete.push(link.id);
      }
    });

    // Loop through the new list and see if anything new has been added
    _event.linkedDeviceIds.forEach((deviceId: Device['id']) => {
      const oldDeviceIds = oldEmployeeDeviceList?.map((link: DeviceEmployeeLink) => link.deviceId);
      if (!oldDeviceIds?.includes(deviceId)) {
        linksToAdd.push({
          employeeId: _event.employeeId,
          deviceId: deviceId
        });
      }
    });

    // Loop through both lists and dispatch add/remove events
    if (linksToDelete.length > 0) {
      linksToDelete.forEach((id: DeviceEmployeeLink['id']) => {
        this.store.dispatch(removeDeviceEmployeeLink({ data: id }));
      });
    }

    if (linksToAdd.length > 0) {
      linksToAdd.forEach((newLink: { deviceId: Device['id'], employeeId: Employee['id'] }) => {
        this.store.dispatch(addNewDeviceEmployeeLink({ data: newLink }));
      });
    }
    console.log(_event);
  }

  public getLinkedDeviceIds(id: Employee['id']): Device['id'][] {
    if (!this.deviceEmployeeLinks) return [];
    return this.deviceEmployeeLinks
      .filter((link: DeviceEmployeeLink) => link.employeeId === id)
      .map((link: DeviceEmployeeLink) => link.deviceId);
  }
}
