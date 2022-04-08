import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PanelComponent } from './panel/panel.component';
import { EmployeesComponent } from './employees/employees.component';
import { DevicesComponent } from './devices/devices.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PanelComponent,
    EmployeesComponent,
    DevicesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    // Routing
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
