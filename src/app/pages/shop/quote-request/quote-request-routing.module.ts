import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteRequestPage } from './quote-request.page';

const routes: Routes = [
  {
    path: '',
    component: QuoteRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuoteRequestPageRoutingModule {}
