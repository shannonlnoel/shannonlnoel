import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from './schedule-routing.module';

import { SchedulePage } from './schedule.page';
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
    SchedulePageRoutingModule,
    NgCalendarModule,
    DatePipe
  ],
  declarations: [SchedulePage],
  providers: [{provide: LOCALE_ID, useValue: 'en'}, DatePipe]
})
export class SchedulePageModule {}
