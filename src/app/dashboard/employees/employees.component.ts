import { updateEmployees } from '@actions';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Device, Employee } from '@models';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  @Input() devices: Device[]|null = null;
  @Input() employees: Employee[]|null = null;

  formGroup: FormGroup | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  public toggleEditing(id: Employee['id']) {
    const employee = this.employees?.find(e => e.id === id);
    if (employee) {
      employee.editing = !employee.editing;
    }

    if (employee?.editing) {
      this.setupForm(employee)
    }
  }

  getDeviceDetails(id: Device['id']) {
    return `Device #${id} - ${this.devices?.find(d => d.id === id)?.name}` 
  }

  onSubmit() {
    const value = this.formGroup?.value
    let employee = this.employees?.find(e => e.editing);
    
    if (value) {
      this.store.dispatch(updateEmployees({ data: value }))
    }
  }

  setupForm(employee: Employee) {

    const formGroup = this.fb.group({
      'name': this.fb.control(employee.name),
      'emailAddress': this.fb.control(employee.emailAddress)
    })

    this.formGroup = formGroup;

  }

}
