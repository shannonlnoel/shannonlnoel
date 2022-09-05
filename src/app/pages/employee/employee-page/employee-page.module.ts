import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EmployeePagePageRoutingModule } from './employee-page-routing.module';

import { EmployeePagePage } from './employee-page.page';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EmployeePagePageRoutingModule
  ],
  declarations: [EmployeePagePage]
})
export class EmployeePagePageModule {}
