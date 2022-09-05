import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemFilterPageRoutingModule } from './item-filter-routing.module';

import { ItemFilterPage } from './item-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemFilterPageRoutingModule
  ],
  declarations: [ItemFilterPage]
})
export class ItemFilterPageModule {}
