import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { QualificationPageRoutingModule } from './qualification-routing.module';

import { QualificationPage } from './qualification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QualificationPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [QualificationPage]
})
export class QualificationPageModule {}
