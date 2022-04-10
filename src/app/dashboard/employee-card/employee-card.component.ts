
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device, Employee, LinkedDevice } from '@models';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCardComponent implements OnInit {

  @Input() employee!: Employee;
  @Input() linkedDeviceIds!: Device['id'][];
  @Input() devices!: Device[];

  @Output() employeeChanged: EventEmitter<Partial<Employee>> = new EventEmitter();
  @Output() linkedDevicesChanged: EventEmitter<{ employeeId: Employee['id'], linkedDeviceIds: Device['id'][] }> = new EventEmitter();

  public employeeDeviceList: LinkedDevice[]|null = null;
  public formGroup: FormGroup|null = null;
  public employeeDevices: Device[]|null = null;
  public processing = false;
  
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this._buildEmployeeDeviceList();
  }

  /**
   * Controls the editing state and whether to build or destroy the form
   * @returns {void}
   */
  public editEmployee(): void {
    this.formGroup = this.buildForm();
  }

  /**
   * Checks form validity and emits event with form value.
   * @returns {void}
   */
  public onSubmit(): void {
    const value = this.formGroup!.value as { name: string, emailAddress: string, linkedDevices: Device['id'][]};
    if (this.formGroup!.valid && this.formGroup!.dirty) {
      this.employeeChanged.emit({
        name: value.name,
        emailAddress: value.emailAddress,
        id: this.employee.id
      });
      this.linkedDevicesChanged.emit({
        employeeId: this.employee.id,
        linkedDeviceIds: value.linkedDevices
      });
    }
    this.formGroup = null;
  }

  /**
   * Adds a 'linked' boolean property to devices
   * @returns {void}
   */
  private _buildEmployeeDeviceList() {
    this.employeeDeviceList = null;
    this.employeeDeviceList = this.devices
      .map((device: Device) => {
        return {
          ...device,
          linked: this.linkedDeviceIds.includes(device.id)
        };
      });
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
      "name": this.fb.control(
        {
          value: this.employee.name,
          disabled: false
        },
        {
          validators: [Validators.required]
        }
      ),
      "emailAddress": this.fb.control(
        {
          value: this.employee.emailAddress,
          disabled: false
        },
        {
          validators: [
            Validators.required,
            Validators.email
          ]
        }
      ),
      "linkedDevices": this.fb.control(
        {
          value: this.employeeDeviceList
            ?.filter(device => device.linked)
            .map(linkedDevice => linkedDevice.id),
          disabled: false
        }
      ),
    });
    console.log('Form Group ready.');
    return formGroup;
  }

}
