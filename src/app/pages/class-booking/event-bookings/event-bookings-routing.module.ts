import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventBookingsPage } from './event-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: EventBookingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventBookingsPageRoutingModule {}
