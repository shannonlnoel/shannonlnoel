import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VATPage } from './vat.page';

const routes: Routes = [
  {
    path: '',
    component: VATPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VATPageRoutingModule {}
