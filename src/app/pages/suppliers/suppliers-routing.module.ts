import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuppliersPage } from './suppliers.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: SuppliersPage,
    children:[
      {
        path: 'supplier-page',
        loadChildren: () => import('./supplier-page/supplier-page.module').then( m => m.SupplierPagePageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuppliersPageRoutingModule {}
