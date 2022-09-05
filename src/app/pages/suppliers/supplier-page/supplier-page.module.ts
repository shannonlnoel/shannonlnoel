import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierPagePageRoutingModule } from './supplier-page-routing.module';

import { SupplierPagePage } from './supplier-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplierPagePageRoutingModule
  ],
  declarations: [SupplierPagePage]
})
export class SupplierPagePageModule {}
