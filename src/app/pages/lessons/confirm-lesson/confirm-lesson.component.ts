import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';

@Component({
  selector: 'app-confirm-lesson',
  templateUrl: './confirm-lesson.component.html',
  styleUrls: ['./confirm-lesson.component.scss'],
})
export class ConfirmLessonComponent implements OnInit {

  @Input() choice : any;
  @Input() lesson : any;
  i = 0;
  
  showImage = false;
  imgSrc = '';

  constructor(private modalCtrl : ModalController, private global : GlobalService, private lessonService : LessonService, private toastCtrl : ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log(this.lesson);
    this.showImage = this.lesson.showImage;
    this.imgSrc = this.lesson.imgSrc;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  getEmp() {
    return this.lesson.employee.split(',')[1];
  }

  getListNo() {
    return ++this.i;
  }

  async returnFrom(){
    //1 = return to ADD
    //2 = return to UPDATE
    if (this.choice === 1){
      // console.log(this.lesson);
      await this.dismissModal();
      this.lessonService.addLessonInfoModal(this.lesson);
    } else if (this.choice === 2){
      // console.log(this.lesson)
      await this.dismissModal();
      this.lessonService.updateLessonInfoModal(this.lesson);
    }
  }

  confirmChanges() {
    if (this.choice === 1){
      //CREATE

      //format for create:
      const exercisePOST = [];
      this.lesson.exercises.forEach((el : any) => {
        exercisePOST.push(el.ExerciseId);
      });

      const post = {
        Lesson: {
          lessonID: 0,
          name: this.lesson.name,
          EmployeeID: this.lesson.employee.split(',')[0]
        },
        Exercises: exercisePOST
      }

      this.global.nativeLoad("Creating...");
      console.log('Add Employee from confirm:');
      this.lessonService.createLesson(post).then((el : any) => {
        if (el) {
          this.dismissModal();
          this.sucAdd();
        } else {
          this.duplicateAlert();
        }
          // this.employeeService.fetchEmployeesEvent.emit();
      });

    } else if (this.choice === 2){

      const exercisePOST = [];
      this.lesson.exercises.forEach((el : any) => {
        exercisePOST.push(el.ExerciseId);
      });

      const post = {
        Lesson: {
          lessonID: 0,
          name: this.lesson.name,
          EmployeeID: parseInt(this.lesson.employee.split(',')[0])
        },
        Exercises: exercisePOST
      }

      //UPDATE
      this.global.nativeLoad("Updating...");
      console.log('sending to API', post)
      this.lessonService.updateLesson(this.lesson.lessonID, post).then((el) => { //#TODO: CHECK HOW TO GET THE ID FOR UPDATE
        if (el) {
          this.dismissModal();
          this.sucUpdate();
        } else {
          this.duplicateAlert();
        }
      });

    }
  }

  
  async sucAdd() {
    const toast = await this.toastCtrl.create({
      message: 'The Lesson has been successfully added!',
      duration: 2000
    });
    toast.present();
  }

  async sucUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'The Lesson has been successfully updated!',
      duration: 2000
    });
    toast.present();
  }

  async duplicateAlert() {
    console.trace();
    const alert = await this.alertCtrl.create({
      header: 'Employee Already Exists',
      message: 'The Employee Information entered already exists on the system',
      buttons: ['OK']
    });
   alert.present();
  }

}
