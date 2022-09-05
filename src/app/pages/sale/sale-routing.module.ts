import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalePage } from './sale.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: SalePage,
    children:[
      {
        path: 'sale-item',
        loadChildren: () => import('./sale-item/sale-item.module').then( m => m.SaleItemPageModule)
      },
      {
        path: 'sale-category',
        loadChildren: () => import('./sale-category/sale-category.module').then( m => m.SaleCategoryPageModule)
      },
      {
        path: 'vat',
        loadChildren: () => import('./vat/vat.module').then( m => m.VATPageModule)
      },
      {
        path: 'refund-reason',
        loadChildren: () => import('./refund-reason/refund-reason.module').then( m => m.RefundReasonPageModule)
      },
      {
        path: 'write-off-reason',
        loadChildren: () => import('./write-off-reason/write-off-reason.module').then( m => m.WriteOffReasonPageModule)
      },
      {
        path: 'write-off',
        loadChildren: () => import('./write-off/write-off.module').then( m => m.WriteOffPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/sale-item',
    pathMatch: 'full'
  },
  {
    path: 'write-off',
    loadChildren: () => import('./write-off/write-off.module').then( m => m.WriteOffPageModule)
  },
  {
    path: 'write-off-reason',
    loadChildren: () => import('./write-off-reason/write-off-reason.module').then( m => m.WriteOffReasonPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalePageRoutingModule {}
