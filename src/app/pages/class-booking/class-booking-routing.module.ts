import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassBookingPage } from './class-booking.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ClassBookingPage,
    children: [
      {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
      },
      {
        path: 'event-bookings',
        loadChildren: () => import('./event-bookings/event-bookings.module').then( m => m.EventBookingsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo:'tabs/calendar',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassBookingPageRoutingModule {}
