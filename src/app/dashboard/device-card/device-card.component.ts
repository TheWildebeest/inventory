import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Device, Employee, LinkedEmployee } from '@models';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent implements OnInit {

  @Input() device!: Device;
  @Input() linkedEmployeeIds!: Employee['id'][];
  @Input() employees!: Employee[];

  @Output() deviceChanged: EventEmitter<Partial<Device>> = new EventEmitter();
  @Output() linkedEmployeesChanged: EventEmitter<{ deviceId: Device['id'], linkedEmployeeIds: Device['id'][] }> = new EventEmitter();

  public linkedEmployeeList: LinkedEmployee[]|null = null;
  public formGroup: FormGroup|null = null;
  
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this._buildLinkedEmployeeList();
  }

  /**
   * Controls the editing state and whether to build or destroy the form
   * @returns {void}
   */
  public editDevice(): void {
    this.formGroup = this.buildForm();
  }

  /**
   * Checks form validity and emits event with form value.
   * @returns {void}
   */
  public onSubmit(): void {
    const value = this.formGroup!.value as { name: string, description: string, linkedEmployees: Employee['id'][]};
    console.log('Submit called.');
    console.log(this.formGroup?.valid);
    if (this.formGroup!.valid && this.formGroup!.dirty) {
      console.log('Submitting...');
      
      this.deviceChanged.emit({
        name: value.name,
        description: value.description,
        id: this.device.id
      });

      this.linkedEmployeesChanged.emit({
        deviceId: this.device.id,
        linkedEmployeeIds: value.linkedEmployees
      });
    }
    this.formGroup = null;
  }

  /**
   * Adds a 'linked' boolean property to employees
   * @returns {void}
   */
  private _buildLinkedEmployeeList() {
    this.linkedEmployeeList = this.employees
      .map((employee: Employee) => {
        return {
          ...employee,
          linked: this.linkedEmployeeIds.includes(employee.id)
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
          value: this.device.name,
          disabled: false
        },
        {
          validators: [Validators.required]
        }
      ),
      "description": this.fb.control(
        {
          value: this.device.description,
          disabled: false
        },
        {
          validators: [Validators.required]
        }
      ),
      "linkedEmployees": this.fb.control(
        {
          value: this.linkedEmployeeList
            ?.filter(employee => employee.linked)
            .map(linkedEmployee => linkedEmployee.id),
          disabled: false
        }
      ),
    });
    console.log('Form Group ready.');
    return formGroup;
  }


}
