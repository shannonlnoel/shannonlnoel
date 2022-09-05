import { Component, Input} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { ExerciseCategory } from 'src/app/models/exercise-category';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-update-exercise-category',
  templateUrl: './update-exercise-category.component.html',
  styleUrls: ['./update-exercise-category.component.scss'],
})
export class UpdateExerciseCategoryComponent implements ViewWillEnter {
  @Input() exerciseCategory: ExerciseCategory;

  uExerciseCategoryForm: UntypedFormGroup = new UntypedFormGroup({
    exerciseCategoryDescription: new UntypedFormControl('', [Validators.required]),
    exerciseCategoryName: new UntypedFormControl('', [Validators.required])
  });

  constructor(public global: GlobalService, public fb: UntypedFormBuilder,
    public exerciseService: ExerciseService) { }

  //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.uExerciseCategoryForm.controls;
  }

  ionViewWillEnter() {
    console.log('UpdateExerciseCategory-ViewWillEnter');
    console.log(this.exerciseCategory);
    if (this.exerciseCategory == null){
      this.global.showAlert("Exercise category not passed to update","ERROR");
      this.global.dismissModal();
    }  else {
      this.uExerciseCategoryForm.controls.exerciseCategoryName.setValue(this.exerciseCategory.name);
      this.uExerciseCategoryForm.controls.exerciseCategoryDescription.setValue(this.exerciseCategory.description);
    }

  }

  submitForm() {
    if
    (!this.uExerciseCategoryForm.valid) { //If the form has any validation errors, the form will not be submitted.
      console.log('Please provide all required fields');
      return false;
    }
    else
    {
      console.log('InsideUpdateSubmit:');
      var temp = new ExerciseCategory();
      const choice = 2;
      temp = {
        exerciseCategoryID: this.exerciseCategory.exerciseCategoryID,
        name: this.uExerciseCategoryForm.value['exerciseCategoryName'],
        description: this.uExerciseCategoryForm.value['exerciseCategoryDescription'],
        exercises: []
      };
       console.log(temp);
       this.exerciseService.confirmExerciseCategoryModal(choice,temp);
       this.global.dismissModal();
    }
  }
}
