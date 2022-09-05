import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { QualificationTypePageRoutingModule } from './qualification-type-routing.module';

import { QualificationTypePage } from './qualification-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QualificationTypePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [QualificationTypePage]
})
export class QualificationTypePageModule {}
