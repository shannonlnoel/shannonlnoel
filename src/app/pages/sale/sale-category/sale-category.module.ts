import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SaleCategoryPageRoutingModule } from './sale-category-routing.module';

import { SaleCategoryPage } from './sale-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaleCategoryPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SaleCategoryPage]
})
export class SaleCategoryPageModule {}
