import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WriteOffPage } from './write-off.page';

const routes: Routes = [
  {
    path: '',
    component: WriteOffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WriteOffPageRoutingModule {}
