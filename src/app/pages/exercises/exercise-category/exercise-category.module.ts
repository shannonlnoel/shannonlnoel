import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicModule } from '@ionic/angular';

import { ExerciseCategoryPageRoutingModule } from './exercise-category-routing.module';

import { ExerciseCategoryPage } from './exercise-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciseCategoryPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ExerciseCategoryPage]
})
export class ExerciseCategoryPageModule {}
