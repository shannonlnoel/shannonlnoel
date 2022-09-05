import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WriteOffReasonPageRoutingModule } from './write-off-reason-routing.module';

import { WriteOffReasonPage } from './write-off-reason.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WriteOffReasonPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [WriteOffReasonPage]
})
export class WriteOffReasonPageModule {}
