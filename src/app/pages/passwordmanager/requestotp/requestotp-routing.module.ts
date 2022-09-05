import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestotpPage } from './requestotp.page';

const routes: Routes = [
  {
    path: '',
    component: RequestotpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestotpPageRoutingModule {}
