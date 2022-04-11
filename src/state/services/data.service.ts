import { Injectable } from "@angular/core";
import { delay, map, Observable, of } from "rxjs";
import { Device, Employee } from "@models";
import { HttpClient } from "@angular/common/http";
import { DeviceEmployeeLink } from "@models/_device-employee-link.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _idCount = 23;


  constructor(
    private http: HttpClient
  ) { }

  public getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>('/assets/data/devices.json')
    .pipe(delay(Math.random() * 1000 + 1400));
  }


  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/assets/data/employees.json')
      .pipe(delay(Math.random() * 1000 + 1400));
  }

  public getDeviceEmployeeLinks(): Observable<DeviceEmployeeLink[]> {
    return this.http.get<DeviceEmployeeLink[]>('/assets/data/device-employee-links.json')
      .pipe(delay(Math.random() * 1000 + 1400));
  }

  public updateIndividualEmployee(updatedEmployeeData: Partial<Employee>, allEmployees: Employee[]|null): Observable<{ data: Employee|null}> {

    return of(true).pipe(
      delay(Math.random() * 700 + 1400),
      map(() => {
        const originalEmployee = allEmployees?.find((e => e.id === updatedEmployeeData.id));
        if (originalEmployee) {
          const updatedEmployee: Employee = {
            ...originalEmployee,
            ...updatedEmployeeData
          };
          return { data: updatedEmployee };
        } else {
          return { data: null };
        }
      })
    );
  }

  public updateIndividualDevice(updatedDeviceData: Partial<Device>, allDevices: Device[]|null): Observable<{ data: Device|null} > {

    return of(true).pipe(
      delay(Math.random() * 700 + 1400),
      map(() => {
        const originalDevice = allDevices?.find((e => e.id === updatedDeviceData.id));
        if (originalDevice) {
          const updatedDevice: Device = {
            ...originalDevice,
            ...updatedDeviceData
          };
          return { data: updatedDevice };
        } else {
          return { data: null };
        }
      })
    );
  }

  public addNewDeviceEmployeeLink(newLinkData: { employeeId: Employee['id'], deviceId: Device['id'] }): Observable<{ data: DeviceEmployeeLink }> {

    console.log('Adding new link');
    

    const id = this._idCount;
    this._idCount ++;
    return of(true).pipe(
      delay(Math.random() * 700 + 1400),
      map(() => {
        return { data: { ...newLinkData, id } };
      })
    );
  }

  public removeDeviceEmployeeLink(linkId: DeviceEmployeeLink['id']): Observable<{ data: { deleted: boolean } }> {
    console.log('Deleting Device-Employee Link with Link ID #', linkId);

    return of(true).pipe(
      delay(Math.random() * 700 + 1400),
      map(() => {
        return { data: { deleted: true } };
      })
    );
  }

}

