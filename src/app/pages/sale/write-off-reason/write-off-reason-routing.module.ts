import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WriteOffReasonPage } from './write-off-reason.page';

const routes: Routes = [
  {
    path: '',
    component: WriteOffReasonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteOffReasonPageRoutingModule {}
