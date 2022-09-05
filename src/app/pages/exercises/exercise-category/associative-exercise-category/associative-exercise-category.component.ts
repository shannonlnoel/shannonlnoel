import { Component, Input, OnInit } from '@angular/core';
import { ExerciseCategory } from 'src/app/models/exercise-category';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-associative-exercise-category',
  templateUrl: './associative-exercise-category.component.html',
  styleUrls: ['./associative-exercise-category.component.scss'],
})
export class AssociativeExerciseCategoryComponent implements OnInit {
  @Input() exerciseCategory: ExerciseCategory;
  constructor(public global:GlobalService) { }

  ngOnInit() {}

}
