import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierPagePage } from './supplier-page.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierPagePageRoutingModule {}
