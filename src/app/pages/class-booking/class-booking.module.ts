import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClassBookingPageRoutingModule } from './class-booking-routing.module';

import { ClassBookingPage } from './class-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassBookingPageRoutingModule
  ],
  declarations: [ClassBookingPage]
})
export class ClassBookingPageModule {}
