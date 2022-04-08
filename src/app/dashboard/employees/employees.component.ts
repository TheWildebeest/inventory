import { Component, Input, OnInit } from '@angular/core';
import { Device, Employee } from '@models';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  @Input() devices: Device[]|null = null;
  @Input() employees: Employee[]|null = null;

  constructor() { }

  ngOnInit(): void {
    console.log(this.employees)
  }

}
