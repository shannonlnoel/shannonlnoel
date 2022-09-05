import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordmanagerPageRoutingModule } from './passwordmanager-routing.module';

import { PasswordmanagerPage } from './passwordmanager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordmanagerPageRoutingModule
  ],
  declarations: [PasswordmanagerPage]
})
export class PasswordmanagerPageModule {}
