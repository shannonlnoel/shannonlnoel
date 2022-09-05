import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { TitlesPageRoutingModule } from './titles-routing.module';

import { TitlesPage } from './titles.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TitlesPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [TitlesPage]
})
export class TitlesPageModule {}
