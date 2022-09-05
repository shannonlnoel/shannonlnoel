import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordmanagerPage } from './passwordmanager.page';

const routes: Routes = [

  {
    path: 'change',
    component: PasswordmanagerPage,
  },
  {
    path: 'create',
    loadChildren: () => import('./setnewpassword/setnewpassword.module').then( m => m.SetnewpasswordPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./verifyotp/verifyotp.module').then( m => m.VerifyotpPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./requestotp/requestotp.module').then( m => m.RequestotpPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordmanagerPageRoutingModule {}
