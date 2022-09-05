import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingPage } from './booking.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: BookingPage,
    children: [
      {
        path: 'booking-type',
        loadChildren: () => import('./booking-type/booking-type.module').then( m => m.BookingTypePageModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
      },
      {
        path: 'client-booking',
        loadChildren: () => import('./client-booking/client-booking.module').then( m => m.ClientBookingPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo:'tabs/schedule',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingPageRoutingModule {}
