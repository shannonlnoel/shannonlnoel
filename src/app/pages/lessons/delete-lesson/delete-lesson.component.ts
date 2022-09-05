import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { LessonService } from 'src/app/services/lesson/lesson.service';

@Component({
  selector: 'app-delete-lesson',
  templateUrl: './delete-lesson.component.html',
  styleUrls: ['./delete-lesson.component.scss'],
})
export class DeleteLessonComponent implements OnInit {

  @Input() lesson : any;

  showImage = false;
  imgSrc = '';

  constructor(private modalCtrl : ModalController, private lessonService : LessonService, private toastCtrl : ToastController, private alertCtrl : AlertController) { }

  ngOnInit() {
    this.showImage = this.lesson.showImage;
    this.imgSrc = this.lesson.imgSrc;
  }

  deleteLesson() {
    //#TODO delete the lesson here
    console.log(this.lesson.lessonID);
    this.lessonService.deleteLesson(this.lesson.lessonID).then(resp => {
      if (resp) {
        this.sucDelete();
        this.dismissModal();
      } else {
        this.failureAlert();
      }
    });

  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  async sucDelete() {
    const toast = await this.toastCtrl.create({
      message: 'The Lesson has been successfully deleted!',
      duration: 2000
    });
    toast.present();
  }

  async failureAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Could not delete Lesson',
      message: 'There was an error deleting the Lesson, please try again.',
      buttons: ['OK']
    });
    alert.present();
  }

}
