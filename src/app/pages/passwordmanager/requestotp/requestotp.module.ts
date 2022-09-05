import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestotpPageRoutingModule } from './requestotp-routing.module';

import { RequestotpPage } from './requestotp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestotpPageRoutingModule
  ],
  declarations: [RequestotpPage]
})
export class RequestotpPageModule {}
