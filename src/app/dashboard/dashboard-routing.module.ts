import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from '../not-found/not-found.component';
import { DashboardComponent } from './dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { EmployeesComponent } from './employees/employees.component';
import { PanelComponent } from './panel/panel.component';

const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    children: [
      { path: 'devices', component: DevicesComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: '', component: PanelComponent },
      { path: '**', component: NotFoundComponent}
    ]
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
