import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseCategory } from 'src/app/models/exercise-category';
import { GlobalService } from 'src/app/services/global/global.service';
import { ExerciseService } from 'src/app/services/exercise/exercise.service';
import { ModalController, ToastController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-confirm-exercise',
  templateUrl: './confirm-exercise.component.html',
  styleUrls: ['./confirm-exercise.component.scss'],
})
export class ConfirmExerciseComponent implements OnInit {

  @Input() choice: number;
  @Input() exercise: Exercise;
  
  exName! : any;
  embed! : any;

  constructor(public toastCtrl: ToastController, private modalCtrl: ModalController, public global: GlobalService, public exerciseService: ExerciseService, public sanitizer: DomSanitizer) {

  }

  //1 = confirm ADD
  //2 = confirm UPDATE
  async confirmChanges(exercise: Exercise) {

    if (this.choice == 1) {

      this.global.nativeLoad("Creating...");
      this.exerciseService.createExercise(exercise).then((el : any) => {
        this.dismissModal();
        this.sucAdd();
      });

    } else {

      this.global.nativeLoad("Updating...");
      this.exerciseService.updateExercise(exercise.exerciseID, exercise).then((el : any) => {
        this.dismissModal();
        this.sucUpdate();
      })
    }


  }

  dismissModal() {
    this.modalCtrl.dismiss();
  };

  ngOnInit() {
    this.exName = this.exercise.ExerciseCategoryID.toString().split(',')[1];
    this.exercise.ExerciseCategoryID = Number(this.exercise.ExerciseCategoryID.toString().split(',')[0]);

    const e = this.global.YoutubeToEmbed(this.exercise.url)
    this.embed = this.sanitizer.bypassSecurityTrustResourceUrl(e);
  }

  async sucAdd() {
    const toast = await this.toastCtrl.create({
      message: 'The Exercise has been successfully added!',
      duration: 2000
    });
    toast.present();
  }

  async sucUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'The Exercise has been successfully updated!',
      duration: 2000
    });
    toast.present();
  }

  async returnFrom() {
    //1 = return to ADD
    //2 = return to UPDATE

    // if (this.choice === 1){
    //   console.log(this.exercise);
    //   this.global.dismissModal();
    //   this.exerciseService.addExerciseInfoModal(this.exercise);
    // } else if (this.choice === 2){
    //   console.log(this.exercise);
    //   this.global.dismissModal();
    //   this.exerciseService.updateExerciseInfoModal(this.exercise);
    // }

    this.modalCtrl.dismiss();

  }


}
