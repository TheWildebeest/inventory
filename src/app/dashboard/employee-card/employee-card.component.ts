import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device, Employee } from '@models';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html'
})
export class EmployeeCardComponent {

  @Input() employee!: Employee;
  @Input() linkedDevices!: Device[];
  @Output() employeeChanged: EventEmitter<Partial<Employee>> = new EventEmitter();

  public formGroup: FormGroup|null = null;
  public editing = false;
  public processing = false;
  
  constructor(
    private fb: FormBuilder
  ) { }

  /**
   * Controls the editing state and whether to build or destroy the form
   * @returns {void}
   */
  public toggleEditing(): void {
    this.editing = !this.editing;

    if (this.editing) {
      this.formGroup = this.buildForm();
    } else {
      this.formGroup = null;
    }
  }

  /**
   * Checks form validity and emits event with form value.
   * @returns {void}
   */
  public onSubmit(): void {
    const value = this.formGroup!.value as { name: string, emailAddress: string };
    if (this.formGroup!.valid) {
      this.employeeChanged.emit({
        ...value,
        id: this.employee.id
      });
    }
  }

  /**
   * Calls FormBuilder to instantiate form controls.
   * @returns {FormGroup}
   */
  private buildForm(): FormGroup {

    // I use the object literal syntax for both arguments
    // -form control state
    // -form control options
    // when setting up form controls. I find it clearer
    // and easier to understand

    const formGroup = this.fb.group({
      name: this.fb.control({
        value: this.employee.name,
        disabled: false
      },
      {
        validators: [Validators.required]
      }),
      emailAddress: this.fb.control({
        value: this.employee.emailAddress,
        disabled: false
      },
      {
        validators: [
          Validators.required,
          Validators.email
        ]
      })
    });

    return formGroup;

  }

}
