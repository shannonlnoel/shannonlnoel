import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExercisesPage } from './exercises.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ExercisesPage,
    children:[
      {
        path: 'exercise-category',
        loadChildren: () => import('./exercise-category/exercise-category.module').then( m => m.ExerciseCategoryPageModule)
      },
      {
        path: 'exercise-page',
        loadChildren: () => import('./exercise-page/exercise-page.module').then( m => m.ExercisePagePageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/exercise-page',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesPageRoutingModule {}
