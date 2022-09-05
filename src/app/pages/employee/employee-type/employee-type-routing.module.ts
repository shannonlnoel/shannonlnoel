import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeTypePage } from './employee-type.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeTypePageRoutingModule {}
