import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { NgCalendarModule } from 'ionic2-calendar';

//Testing adding afrikaans language switch
import localeAf from '@angular/common/locales/af'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeAf);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    NgCalendarModule,
    DatePipe
  ],
  declarations: [CalendarPage],
  providers: [{provide: LOCALE_ID, useValue: 'en'}, DatePipe]
})
export class CalendarPageModule {}
