import { Component, Input } from '@angular/core';
import { ExerciseCategory } from 'src/app/models/exercise-category';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-confirm-exercise-category',
  templateUrl: './confirm-exercise-category.component.html',
  styleUrls: ['./confirm-exercise-category.component.scss'],
})
export class ConfirmExerciseCategoryComponent {

  @Input() choice: number;
  @Input() exerciseCategory: ExerciseCategory;

  constructor(public global: GlobalService, public exerciseService: ExerciseService ) {
  }

  async checkMatch(name:string, description:string): Promise<boolean>{
    return this.exerciseService.matchingExerciseCategory(name,description).then(data => {
      console.log("Check match result:");
      console.log(data);
       if (data != 0){
        let match = data.result;
        if (match.length > 1){
          this.global.showAlert("The exercise category information entered already exists on the system","Duplicate Entry");
          return true;
        } else if (match.length == 1 && this.choice == 2 && match[0].exerciseCategoryID == this.exerciseCategory.exerciseCategoryID){
          alert("Matching itself in update");
          return false;
        } else {
          console.log("Must be in ADD, with exactly 1 other match: ");
          console.log("Choice: " + this.choice);
          this.global.showAlert("The exercise category information entered already exists on the system","Duplicate Entry");
          return true;
        }
       } else {
         return false;
       }
     });
   }


  //1 = confirm ADD
  //2 = confirm UPDATE

  async confirmChanges(exerciseCategory: ExerciseCategory){
    //search duplicates
    await this.checkMatch(exerciseCategory.name,exerciseCategory.description).then(result =>{
      console.log(result);
      if (result == true){
         return;
       } else {
          if (this.choice === 1){
            console.log('Add exercise Category from confirm:');
            //CallRepoToCreate
            this.exerciseService.createExerciseCategory(exerciseCategory);
            this.global.dismissModal();
            this.global.showToast('The exercise category has been successfully added!');
        } else if (this.choice === 2){
            console.log('Update exercise Category from confirm:');
            //CallRepoToUpdate
            this.exerciseService.updateExerciseCategory(exerciseCategory.exerciseCategoryID,exerciseCategory);
            this.global.dismissModal();
            this.global.showToast('The exercise category has been successfully updated!');
          }
        }
      }
    )
  }

  returnFrom(){
    //1 = return to ADD
    //2 = return to UPDATE
    if (this.choice === 1){
      console.log(this.exerciseCategory);
      this.global.dismissModal();
      this.exerciseService.addExerciseCategoryInfoModal(this.exerciseCategory);
    } else if (this.choice === 2){
      console.log(this.exerciseCategory);
      this.global.dismissModal();
      this.exerciseService.updateExerciseCategoryInfoModal(this.exerciseCategory);
    }
  }
}
