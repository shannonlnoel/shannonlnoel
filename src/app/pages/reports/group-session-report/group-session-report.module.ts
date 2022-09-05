import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupSessionReportPageRoutingModule } from './group-session-report-routing.module';

import { GroupSessionReportPage } from './group-session-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupSessionReportPageRoutingModule
  ],
  declarations: [GroupSessionReportPage]
})
export class GroupSessionReportPageModule {}
