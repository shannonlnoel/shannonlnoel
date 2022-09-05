import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WriteOffPageRoutingModule } from './write-off-routing.module';

import { WriteOffPage } from './write-off.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WriteOffPageRoutingModule
  ],
  declarations: [WriteOffPage]
})
export class WriteOffPageModule {}
