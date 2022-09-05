import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberReportPage } from './member-report.page';

const routes: Routes = [
  {
    path: '',
    component: MemberReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberReportPageRoutingModule {}
