import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupSessionReportPage } from './group-session-report.page';

const routes: Routes = [
  {
    path: '',
    component: GroupSessionReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupSessionReportPageRoutingModule {}
