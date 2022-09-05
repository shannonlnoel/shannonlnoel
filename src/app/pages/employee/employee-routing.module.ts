import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeePage } from './employee.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: EmployeePage,
    children:[
      {
        path: 'employee-page',
        loadChildren: () => import('./employee-page/employee-page.module').then( m => m.EmployeePagePageModule)
      },
      {
        path: 'employee-type',
        loadChildren: () => import('./employee-type/employee-type.module').then( m => m.EmployeeTypePageModule)
      },
      {
        path: 'qualification',
        loadChildren: () => import('./qualification/qualification.module').then( m => m.QualificationPageModule)
      },
      {
        path: 'qualification-type',
        loadChildren: () => import('./qualification-type/qualification-type.module').then( m => m.QualificationTypePageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/employee-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class EmployeePageRoutingModule {}
