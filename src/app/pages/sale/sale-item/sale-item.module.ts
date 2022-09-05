import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { SaleItemPageRoutingModule } from './sale-item-routing.module';

import { SaleItemPage } from './sale-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleItemPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SaleItemPage]
})
export class SaleItemPageModule {}
