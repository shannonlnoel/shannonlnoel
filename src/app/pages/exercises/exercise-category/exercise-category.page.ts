import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExerciseCategory } from 'src/app/models/exercise-category';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';

@Component({
  selector: 'app-exercise-category',
  templateUrl: './exercise-category.page.html',
  styleUrls: ['./exercise-category.page.scss'],
})
export class ExerciseCategoryPage implements OnInit {

  //String used from the searchbar, used in the filter pipe to search exercise category.
  public filter: string;

  //Create local exercise category array to be populated onInit.
  exerciseCategoryList: ExerciseCategory[] = [];

  //Subscription variable to track live updates.
  exerciseCategory: Subscription;

  isLoading = true;

  // categories = [
  //   {name : 'Shop',
  //    description : 'Buy now, get product later'},
  //   {name : 'Store',
  //    description : 'Buy now, get product now'}
  // ];

  constructor(public exerciseService: ExerciseService) {
    // this.populateTitles();
    this.fetchExerciseCategory();
   }

   fetchExerciseCategory() {
    this.isLoading = true;
    this.exerciseService.getAllExerciseCategorys().subscribe(
      {
        next: data => {
          console.log('Fetching exercise categories from DB');
          console.log(data);
          this.isLoading = false;
          this.exerciseCategoryList = data.result;
        }
      }
    );
  }
  ngOnInit() {
    this.exerciseService.fetchExerciseCategorysEvent.subscribe(
      {
        next: res => {
          console.log('Fetch exercise categories again');
          this.fetchExerciseCategory();
        }
      }
    );
  }
}

