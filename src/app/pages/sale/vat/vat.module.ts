import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { VATPageRoutingModule } from './vat-routing.module';

import { VATPage } from './vat.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VATPageRoutingModule,
    Ng2SearchPipeModule

  ],
  declarations: [VATPage]
})
export class VATPageModule {}
