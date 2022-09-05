import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsPage } from './reports.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ReportsPage,
    children:[
      {
        path: 'sale-report',
        loadChildren: () => import('./sale-report/sale-report.module').then( m => m.SaleReportPageModule)
      },
      {
        path: 'member-report',
        loadChildren: () => import('./member-report/member-report.module').then( m => m.MemberReportPageModule)
      },
      {
        path: 'group-session-report',
        loadChildren: () => import('./group-session-report/group-session-report.module').then( m => m.GroupSessionReportPageModule)
      },
      {
        path: 'trainer-report',
        loadChildren: () => import('./trainer-report/trainer-report.module').then( m => m.TrainerReportPageModule)
      },
      {
        path: 'income-report',
        loadChildren: () => import('./income-report/income-report.module').then( m => m.IncomeReportPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/sale-report',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsPageRoutingModule {}
