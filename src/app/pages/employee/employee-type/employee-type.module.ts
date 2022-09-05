import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeTypePageRoutingModule } from './employee-type-routing.module';

import { EmployeeTypePage } from './employee-type.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeTypePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [EmployeeTypePage]
})
export class EmployeeTypePageModule {}
