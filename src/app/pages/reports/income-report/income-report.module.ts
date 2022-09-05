import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncomeReportPageRoutingModule } from './income-report-routing.module';

import { IncomeReportPage } from './income-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncomeReportPageRoutingModule
  ],
  declarations: [IncomeReportPage]
})
export class IncomeReportPageModule {}
