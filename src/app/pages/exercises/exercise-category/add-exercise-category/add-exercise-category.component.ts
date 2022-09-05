/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { Component,  Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ExerciseCategory } from 'src/app/models/exercise-category';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { ViewWillEnter} from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-add-exercise-category',
  templateUrl: './add-exercise-category.component.html',
  styleUrls: ['./add-exercise-category.component.scss'],
})
export class AddExerciseCategoryComponent implements ViewWillEnter {

  @Input() exerciseCategory: ExerciseCategory;

   //Creating the form to add the new exercise category details, that will be displayed in the HTML component
   cExerciseCategoryForm: UntypedFormGroup = this.formBuilder.group({
    exerciseCategoryName: ['', [Validators.required]],
    exerciseCategoryDescription: ['', [Validators.required]]
  });

  constructor(public global: GlobalService,  public formBuilder: UntypedFormBuilder,
    public exerciseService: ExerciseService ) { }

  //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.cExerciseCategoryForm.controls;
  }

  ionViewWillEnter(): void {
    console.log("AddExerciseCategory-ViewWillEnter");
    console.log(this.exerciseCategory);
    if (this.exerciseCategory !=null){
      this.cExerciseCategoryForm.controls.exerciseCategoryName.setValue(this.exerciseCategory.name),
      this.cExerciseCategoryForm.controls.exerciseCategoryDescription.setValue(this.exerciseCategory.description);}
    }

    submitForm() {
      if (!this.cExerciseCategoryForm.valid){
        console.log(this.cExerciseCategoryForm.value['exerciseCategoryName']);
        console.log(this.cExerciseCategoryForm.value['exerciseCategoryDescription']);
        console.log('Please provide all required fields');
        return false;
      }
      else
      {
        const temp = {
          name: this.cExerciseCategoryForm.value['exerciseCategoryName'],
          description: this.cExerciseCategoryForm.value['exerciseCategoryDescription'],
          exercises: []
        };
        this.global.dismissModal();
        this.exerciseService.confirmExerciseCategoryModal(1,temp);
      }
     }
}
