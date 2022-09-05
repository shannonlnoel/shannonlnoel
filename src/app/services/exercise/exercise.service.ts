/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/semi */
import { Injectable, Output, EventEmitter } from '@angular/core';
import { AlertController, ModalController, ToastController} from '@ionic/angular';
import { ExerciseCategory } from 'src/app/models/exercise-category';
import { Exercise } from 'src/app/models/exercise';
import { AddExerciseCategoryComponent } from 'src/app/pages/exercises/exercise-category/add-exercise-category/add-exercise-category.component';
import { DeleteExerciseCategoryComponent } from 'src/app/pages/exercises/exercise-category/delete-exercise-category/delete-exercise-category.component';
import { UpdateExerciseCategoryComponent } from 'src/app/pages/exercises/exercise-category/update-exercise-category/update-exercise-category.component';
import { ViewExerciseCategoryComponent } from 'src/app/pages/exercises/exercise-category/view-exercise-category/view-exercise-category.component';
import { ConfirmExerciseCategoryComponent } from 'src/app/pages/exercises/exercise-category/confirm-exercise-category/confirm-exercise-category.component';
import { AssociativeExerciseCategoryComponent } from 'src/app/pages/exercises/exercise-category/associative-exercise-category/associative-exercise-category.component';
import { RepoService } from '../repo.service';
import { Observable } from 'rxjs';
import { AddExerciseComponent } from 'src/app/pages/exercises/exercise-page/add-exercise/add-exercise.component';
import { DeleteExerciseComponent } from 'src/app/pages/exercises/exercise-page/delete-exercise/delete-exercise.component';
import { UpdateExerciseComponent } from 'src/app/pages/exercises/exercise-page/update-exercise/update-exercise.component';
import { ViewExerciseComponent } from 'src/app/pages/exercises/exercise-page/view-exercise/view-exercise.component';
import { ConfirmExerciseComponent } from 'src/app/pages/exercises/exercise-page/confirm-exercise/confirm-exercise.component';
import { AssociativeExerciseComponent } from 'src/app/pages/exercises/exercise-page/associative-exercise/associative-exercise.component';
import { GlobalService } from '../global/global.service';


@Injectable({
  providedIn: 'root'
})

export class ExerciseService {

  @Output() fetchExerciseCategorysEvent = new EventEmitter<ExerciseCategory>();
  @Output() fetchExercisesEvent = new EventEmitter<Exercise>();

  constructor(public toastCtrl: ToastController, public repo: RepoService, private modalCtrl: ModalController, public alertCtrl: AlertController, public global : GlobalService) {
    //Receive the exercise category from the repo (API).
    this.getAllExerciseCategorys();
    this.getAllExercises();
  }

  getAllExerciseCategorys(): Observable<any> {
    return this.repo.getExerciseCategory();
  }

  getAllExercises(): Observable<any> {
    return this.repo.getExercise();
  }

  //Methods
  //Add a exercise category to the exercise category list within the exercise category service.
   createExerciseCategory(exerciseCategory: any) {

    this.repo.createExerciseCategory(exerciseCategory).subscribe(
      {
        next: () => {
          console.log('EXERCISE CATEGORY CREATED');
          this.fetchExerciseCategorysEvent.emit(exerciseCategory);
        },
        error: () => {
        }
      }
    )
   }

   //Add a exercise to the exercise list within the exercise service.
   createExercise(exercise: Exercise) : Promise<any> {
    console.log("Exercise Service: CREATE EXERCISE");
    // const ExerciseTemp:Exercise = {
    //   name: exercise.name,
    //   description: exercise.description,
    //   exerciseCategoryID: exercise.exerciseCategoryID
    // };
    // console.log(ExerciseTemp);

    // this.repo.createExercise(ExerciseTemp).subscribe(
    //   {
    //     next: () => {
    //       console.log('Exercise CREATED');
    //       this.fetchExercisesEvent.emit(exercise);
    //     }
    //   }
    // );

    return new Promise<any>((resolve, _) => {
      this.repo.createExercise(exercise).subscribe({
        next: () => {
          this.fetchExercisesEvent.emit();
          resolve(true);
        },
        error: () => {
          this.duplicateAlert();
          _(false);
        }
      }).add(() => { 
        this.global.endNativeLoad() 
      });
    });

   }

   async duplicateAlert() {
    const alert = await this.alertCtrl.create({
      header: 'EXercise Already Exists',
      message: 'The Exercise Information entered already exists on the system',
      buttons: ['OK']
    });
   alert.present();
  }

  //Receives a exercise category to update in the service exercise category list.
   updateExerciseCategory(id: number,exerciseCategory: any) {
     return this.repo.updateExerciseCategory(id,exerciseCategory).subscribe(
       {
        next: () => {
          console.log('EXERCISE CATEGORY UPDATED');
          this.fetchExerciseCategorysEvent.emit(exerciseCategory);
        }
       }
     )
   }

   //Receives a exercise to update in the service exercise list.
   updateExercise(id: number,exercise: any) {
    // return this.repo.updateExercise(id,exercise).subscribe(
    //   {
    //    next: () => {
    //      console.log('EXERCISE UPDATED');
    //      this.fetchExercisesEvent.emit(exercise);
    //    }
    //   }
    // )
    return new Promise<any>((resolve, _) => {
      this.repo.updateExercise(id, exercise).subscribe({
        next: () => {
          this.fetchExercisesEvent.emit();
          this.dismissModal();
          this.sucUpdate();
        },
        error: () => {
          _(false);
        } 
      }).add(() => { this.global.endNativeLoad() });
    });
  }

  async sucUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'The Exercise has been successfully updated!',
      duration: 2000
    });
    toast.present();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  };

  //Receives a exercise to delete in the service exercise list.
   deleteExercise(id: number) : Promise<any> {
    // this.repo.deleteExercise(id).subscribe(result => {
    //   console.log('EXERCISE DELETED');
    //   this.fetchExercisesEvent.emit();
    // });

    return new Promise<any>((resolve, _) => {
      this.global.nativeLoad("Deleting...");
      this.repo.deleteExercise(id).subscribe({
        next: () => {
          this.fetchExercisesEvent.emit();
          resolve(true);
        },
        error: () => {
          resolve(false);
        }
      }).add(() => {
        this.global.endNativeLoad();
      })
    });

   }

   matchingExercise(name: string, description: string):Promise<any>{
    console.log('ExerciseService: Repo -> Matching Exercise');
    return this.repo.getMatchExercise(name,description).toPromise();
   }

   //Receives a exercise category to delete in the service exercise category list.
   deleteExerciseCategory(id: number){
    this.repo.deleteExerciseCategory(id).subscribe(result => {
      console.log('EXERCISE CATEGORY DELETED');
      this.fetchExerciseCategorysEvent.emit();
    });
   }

   matchingExerciseCategory(name: string, description: string):Promise<any>{
    console.log('ExerciseService: Repo -> Matching ExerciseCategory');
    return this.repo.getMatchExerciseCategory(name,description).toPromise();
   }


  //Modals
  async addExerciseCategoryInfoModal(exerciseCategory?: ExerciseCategory) {
    const modal = await this.modalCtrl.create({
      component: AddExerciseCategoryComponent,
      componentProps:{
        exerciseCategory
      }
    });
    await modal.present();
  }

  async addExerciseInfoModal(exercise?: Exercise) {
    const modal = await this.modalCtrl.create({
      component: AddExerciseComponent,
      componentProps:{
        exercise
      }
    });
    await modal.present();
  }

  //Display the update exercise category modal.
  //This method receives the selected exercise category object, from the exercise category page, in the modal through the componentProps.
  async updateExerciseCategoryInfoModal(exerciseCategory: ExerciseCategory) {
    console.log("ExerciseCategoryService: UpdateExerciseCategoryModalCall");

    const modal = await this.modalCtrl.create({
      component: UpdateExerciseCategoryComponent,
      componentProps:{
        exerciseCategory
      }
    });
    await modal.present();
  }

  //Display the update exercise modal.
  //This method receives the selected exercise object, from the exercise page, in the modal through the componentProps.
  async updateExerciseInfoModal(exercise: Exercise) {
    console.log("ExerciseService: UpdateExerciseModalCall");

    const modal = await this.modalCtrl.create({
      component: UpdateExerciseComponent,
      componentProps:{
        exercise
      }
    });
    await modal.present();
  }

  //Display the delete exercise category modal.
  //This method receives the selected exercise category object, from the exercise category page, in the modal through the componentProps.
  async deleteExerciseCategoryInfoModal(exerciseCategory: ExerciseCategory) {
    console.log("ExerciseCategory: DeleteExerciseCategoryModalCall");
    if (exerciseCategory.exercises! = null && exerciseCategory.exercises.length > 0){
      const modal = await this.modalCtrl.create({
        component: AssociativeExerciseCategoryComponent,
          componentProps: {
            exerciseCategory
        }
      });
      await modal.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: DeleteExerciseCategoryComponent,
          componentProps: {
            exerciseCategory
        }
      });
      await modal.present();
    }
  }

  //Display the delete exercise modal.
  //This method receives the selected exercise object, from the exercise page, in the modal through the componentProps.
  async deleteExerciseInfoModal(exercise: Exercise) {
    if (exercise.lessons! = null && exercise.lessons.length > 0){
      const modal = await this.modalCtrl.create({
        component: AssociativeExerciseComponent,
          componentProps: {
            exercise
        }
      });
      await modal.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: DeleteExerciseComponent,
          componentProps: {
            exercise
        }
      });
      await modal.present();
    }
    }


  //Display the view exercise category modal.
    //This method receives the selected exercise category object, from the exercise category page, in the modal through the componentProps.
  async viewExerciseCategoryInfoModal(exerciseCategory: ExerciseCategory) {
    console.log("ExerciseCategoryService: ViewExerciseCategoryModalCall");
    const modal = await this.modalCtrl.create({
      component: ViewExerciseCategoryComponent,
      componentProps: {
        exerciseCategory
      }
    });
    await modal.present();
  }

  //Display the view exercise modal.
    //This method receives the selected exercise object, from the exercise page, in the modal through the componentProps.
    async viewExerciseInfoModal(exercise: Exercise) {
      console.log("ExerciseService: ViewExerciseModalCall");
      const modal = await this.modalCtrl.create({
        component: ViewExerciseComponent,
        componentProps: {
          exercise
        }
      });
      await modal.present();
    }

  //Display the confirm create/update modal
  //Receives the selected exercise category from the exercise category page
  async confirmExerciseCategoryModal(choice: number, exerciseCategory: any) {
    console.log('ExerciseCategoryService: ConfirmExerciseCategoryModalCall');
    console.log(choice);
    if(choice === 1){
      console.log("Performing ADD");
      const modal = await this.modalCtrl.create({
        component: ConfirmExerciseCategoryComponent,
        componentProps: {
          exerciseCategory,
          choice
        }
      });
      await modal.present();

    } else if (choice === 2){

      console.log("Performing UPDATE");
      const modal = await this.modalCtrl.create({
        component: ConfirmExerciseCategoryComponent,
        componentProps: {
          exerciseCategory,
          choice
        }
      });

      await modal.present();

    } else {

      console.log("BadOption: " + choice)

    }
  }

  //Display the confirm create/update modal
  //Receives the selected exercise from the exercise page
  confirmExerciseModal(choice: number, exercise: any) {
    
    return new Promise<any>(async (resolve, _) => {

      console.log('ExerciseService: ConfirmExerciseModalCall');
      console.log(choice);

      if(choice === 1) {

        console.log("Performing ADD");
        const modal = await this.modalCtrl.create({
          component: ConfirmExerciseComponent,
          componentProps: {
            choice,
            exercise
          }
        });

        modal.onDidDismiss().then(() => {
          resolve(true);
        });

        await modal.present();

      } else if (choice === 2) {

        console.log("Performing UPDATE");
        const modal = await this.modalCtrl.create({
          component: ConfirmExerciseComponent,
          componentProps: {
            choice,
            exercise
          }
        });

        modal.onDidDismiss().then(() => {
          resolve(true);
        });

        await modal.present();

      } else {

        console.log("BadOption: " + choice)

      }
    })

  }

  async associativeExerciseCategoryModal(exerciseCategory: ExerciseCategory) {
    console.log("ExerciseCategoryService: AssociativeModalCall");
    const modal = await this.modalCtrl.create({
      component: AssociativeExerciseCategoryComponent,
      componentProps: {
        exerciseCategory
      }
    });
    await modal.present();
  }

  async associativeExerciseModal(exercise: Exercise) {
    console.log("ExerciseService: AssociativeModalCall");
    const modal = await this.modalCtrl.create({
      component: AssociativeExerciseComponent,
      componentProps: {
        exercise
      }
    });
    await modal.present();
  }
}
