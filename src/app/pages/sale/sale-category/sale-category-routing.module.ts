import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleCategoryPage } from './sale-category.page';

const routes: Routes = [
  {
    path: '',
    component: SaleCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleCategoryPageRoutingModule {}
