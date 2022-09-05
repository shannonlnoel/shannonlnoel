import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainerReportPageRoutingModule } from './trainer-report-routing.module';

import { TrainerReportPage } from './trainer-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainerReportPageRoutingModule
  ],
  declarations: [TrainerReportPage]
})
export class TrainerReportPageModule {}
