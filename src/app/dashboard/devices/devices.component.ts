import { Component, Input } from '@angular/core';
import { Device, DeviceEmployeeLink, Employee } from '@models';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent {

  @Input() devices: Device[]|null = null;
  @Input() employees: Employee[]|null = null;
  @Input() deviceEmployeeLinks: DeviceEmployeeLink[]|null = null;


  constructor() { }

}
