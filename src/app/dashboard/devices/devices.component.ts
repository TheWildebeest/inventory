import { addNewDeviceEmployeeLink, removeDeviceEmployeeLink, updateIndividualDevice } from '@actions';
import { Component, Input } from '@angular/core';
import { Device, DeviceEmployeeLink, Employee } from '@models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent {

  @Input() devices: Device[]|null = null;
  @Input() employees: Employee[]|null = null;
  @Input() deviceEmployeeLinks: DeviceEmployeeLink[]|null = null;


  constructor(
    private store: Store
  ) { }

  /**
   * Dispatches an action to update an device's details
   * @param {Partial<Device>} deviceDetails
   * @returns {void}
   */
  public onDeviceChanged(deviceDetails: Partial<Device>): void {
    this.store.dispatch(updateIndividualDevice({
      data: deviceDetails
    }));
  }

  /**
   * Compares the updated employees list with the original list and dispatches add/remove events as needed.
   * @param {{ deviceId: Device['id'], linkedEmployeeIds: Employee['id'][]}} _event 
   */
  public onLinkedEmployeesChanged(_event: { deviceId: Device['id'], linkedEmployeeIds: Employee['id'][]}) {
    const linksToDelete: DeviceEmployeeLink['id'][] = [];
    const linksToAdd: { deviceId: Device['id'], employeeId: Employee['id'] }[] = [];
    // Get the original list of device-employee links for this device.
    const oldlinkedEmployeeList = this.deviceEmployeeLinks
      ?.filter((link: DeviceEmployeeLink) => link.deviceId === _event.deviceId);

      console.log(`
      DeviceID: ${_event.deviceId},
      Old employees list: ${oldlinkedEmployeeList?.map(link => this.employees?.find(e => e.id === link.employeeId)?.name).join(', ')}
      Updated Linked Employees list: ${_event.linkedEmployeeIds.map(id => this.employees?.find(e => e.id === id)?.name).join(', ')}
      `);

    // If there were no linked employees before and nothing has changed, we can return here.
    if (_event.linkedEmployeeIds.length === 0 && (!oldlinkedEmployeeList || !oldlinkedEmployeeList[0])) {
      return;
    }

    // Loop through the old list and see if anything has been deleted in the new list
    oldlinkedEmployeeList?.forEach((link: DeviceEmployeeLink) => {
      if (!_event.linkedEmployeeIds.includes(link.employeeId)) {
        linksToDelete.push(link.id);
      }
    });

    // Loop through the new list and see if anything new has been added
    _event.linkedEmployeeIds.forEach((employeeId: Employee['id']) => {
      const oldEmployeeIds = oldlinkedEmployeeList?.map((link: DeviceEmployeeLink) => link.employeeId);
      if (!oldEmployeeIds?.includes(employeeId)) {
        linksToAdd.push({
          deviceId: _event.deviceId,
          employeeId: employeeId
        });
      }
    });

    console.log(`
      Add: ${linksToAdd.map(link => this.employees?.find(e => e.id === link.employeeId)?.name).join(', ')},
      Remove: ${linksToDelete
        .map(id => this.deviceEmployeeLinks?.find(link => link.id === id))
        .map(link => this.employees?.find(employee => employee.id === link?.id)?.name)
        .join(', ')}
    `);

    // Loop through both lists and dispatch add/remove events
    if (linksToDelete.length > 0) {
      linksToDelete.forEach((id: DeviceEmployeeLink['id']) => {
        console.log('ID: ', id);
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

  public getLinkedEmployeeIds(id: Device['id']): Employee['id'][] {
    if (!this.deviceEmployeeLinks) return [];
    return this.deviceEmployeeLinks
      .filter((link: DeviceEmployeeLink) => link.deviceId === id)
      .map((link: DeviceEmployeeLink) => link.employeeId);
  }

}
