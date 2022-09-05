import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { RefundReasonPageRoutingModule } from './refund-reason-routing.module';

import { RefundReasonPage } from './refund-reason.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RefundReasonPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [RefundReasonPage]
})
export class RefundReasonPageModule {}
