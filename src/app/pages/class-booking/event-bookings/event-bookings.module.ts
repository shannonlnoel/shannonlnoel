import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventBookingsPageRoutingModule } from './event-bookings-routing.module';

import { EventBookingsPage } from './event-bookings.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventBookingsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [EventBookingsPage]
})
export class EventBookingsPageModule {}
