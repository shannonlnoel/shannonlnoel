import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookingTypePageRoutingModule } from './booking-type-routing.module';
import { BookingTypePage } from './booking-type.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingTypePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [BookingTypePage]
})
export class BookingTypePageModule {}
