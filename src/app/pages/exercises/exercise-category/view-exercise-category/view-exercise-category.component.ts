import { Component, Input } from '@angular/core';
import { ExerciseCategory } from 'src/app/models/exercise-category';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-exercise-category',
  templateUrl: './view-exercise-category.component.html',
  styleUrls: ['./view-exercise-category.component.scss'],
})
export class ViewExerciseCategoryComponent  {
  @Input() exerciseCategory: ExerciseCategory;

  constructor(public global: GlobalService) { }


}
