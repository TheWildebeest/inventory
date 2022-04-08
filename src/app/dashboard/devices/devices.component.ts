import { Component, Input, OnInit } from '@angular/core';
import { Device, Employee } from '@models';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  @Input() devices: Device[]|null = null;
  @Input() employees: Employee[]|null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
