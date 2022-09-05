import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: UserPage,
    children:[
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then( m => m.ClientsPageModule)
      },
      {
        path: 'titles',
        loadChildren: () => import('./titles/titles.module').then( m => m.TitlesPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/titles',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}

