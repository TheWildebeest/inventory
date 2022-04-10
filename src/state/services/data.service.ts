import { Injectable } from "@angular/core";
import { delay, filter, map, Observable, of } from "rxjs";
import { Device, Employee } from "@models";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(
    private http: HttpClient
  ) { }

  public getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>('/assets/data/devices.json')
    .pipe(delay(Math.random() * 1000 + 1400))
  }

      
  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/assets/data/employees.json')
      .pipe(delay(Math.random() * 1000 + 1400))
  }

  public updateIndividualEmployee(updatedEmployeeData: Partial<Employee>, allEmployees: Employee[]|null): Observable<{ data: Employee|null} > {
    console.log('dataService: updateIndividualEmployee');
    return of(true).pipe(
      delay(Math.random() * 700 + 1400),
      map(() => {
        console.log('delay successful');
        const originalEmployee = allEmployees?.find((e => e.id === updatedEmployeeData.id))
        if (originalEmployee) {
          const updatedEmployee: Employee = {
            ...originalEmployee,
            ...updatedEmployeeData
          };
          return { data: updatedEmployee }
        } else {
          return { data: null }
        }
      })
    )
  }

    public updateIndividualDevice(updatedDeviceData: Partial<Device>, allDevices: Device[]|null): Observable<{ data: Device|null} > {

    return of(true).pipe(
      delay(Math.random() * 700 + 1400),
      map(() => {
        console.log('delay successful');
        const originalDevice = allDevices?.find((e => e.id === updatedDeviceData.id))
        if (originalDevice) {
          const updatedDevice: Device = {
            ...originalDevice,
            ...updatedDeviceData
          };
          return { data: updatedDevice }
        } else {
          return { data: null }
        }
      })
    )
  }

}

