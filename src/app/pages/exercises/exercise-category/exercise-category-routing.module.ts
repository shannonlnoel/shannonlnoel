import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExerciseCategoryPage } from './exercise-category.page';

const routes: Routes = [
  {
    path: '',
    component: ExerciseCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseCategoryPageRoutingModule {}
