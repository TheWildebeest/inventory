import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PanelComponent } from './panel/panel.component';
import { EmployeesComponent } from './employees/employees.component';
import { DevicesComponent } from './devices/devices.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PanelComponent,
    EmployeesComponent,
    DevicesComponent,
    EmployeeCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    // Routing
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
