import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualificationTypePage } from './qualification-type.page';

const routes: Routes = [
  {
    path: '',
    component: QualificationTypePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualificationTypePageRoutingModule {}
