import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainerReportPage } from './trainer-report.page';

const routes: Routes = [
  {
    path: '',
    component: TrainerReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainerReportPageRoutingModule {}
