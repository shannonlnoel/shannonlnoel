import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeePagePage } from './employee-page.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeePagePageRoutingModule {}
