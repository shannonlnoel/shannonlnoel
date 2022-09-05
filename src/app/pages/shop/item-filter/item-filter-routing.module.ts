import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemFilterPage } from './item-filter.page';

const routes: Routes = [
  {
    path: '',
    component: ItemFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemFilterPageRoutingModule {}
