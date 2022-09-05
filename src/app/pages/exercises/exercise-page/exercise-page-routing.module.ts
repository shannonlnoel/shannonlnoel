import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExercisePagePage } from './exercise-page.page';

const routes: Routes = [
  {
    path: '',
    component: ExercisePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisePagePageRoutingModule {}
