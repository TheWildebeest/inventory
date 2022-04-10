import { updateIndividualEmployee } from '@actions';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    const value = this.formGroup?.value as { name: string, emailAddress: string }
    let employee = this.employees?.find(e => e.editing);
    
    if (this.formGroup?.valid && employee) {
      this.store.dispatch(updateIndividualEmployee({
        data: {
          ...value,
          id: employee.id} 
      }))
      employee.editing = false;
    } else return
  }

  setupForm(employee: Employee) {

    const formGroup = this.fb.group({
      name: this.fb.control({ value: employee.name, disabled: false }, { validators: [Validators.required]}),
      emailAddress: this.fb.control({ value: employee.emailAddress, disabled: false}, { validators: [Validators.required, Validators.email] })
    })

    this.formGroup = formGroup;

  }

}
