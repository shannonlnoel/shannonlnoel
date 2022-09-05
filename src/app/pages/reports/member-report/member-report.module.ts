import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberReportPageRoutingModule } from './member-report-routing.module';

import { MemberReportPage } from './member-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemberReportPageRoutingModule
  ],
  declarations: [MemberReportPage]
})
export class MemberReportPageModule {}
