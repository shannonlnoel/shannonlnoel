import { EventEmitter, Injectable, Output } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

import { Lesson } from 'src/app/models/lesson';

import { AddLessonComponent } from 'src/app/pages/lessons/add-lesson/add-lesson.component';
import { UpdateLessonComponent } from 'src/app/pages/lessons/update-lesson/update-lesson.component';
import { DeleteLessonComponent } from 'src/app/pages/lessons/delete-lesson/delete-lesson.component';
import { ViewLessonComponent } from 'src/app/pages/lessons/view-lesson/view-lesson.component';
import { ConfirmLessonComponent } from 'src/app/pages/lessons/confirm-lesson/confirm-lesson.component';
import { AssociativeLessonComponent } from 'src/app/pages/lessons/associative-lesson/associative-lesson.component';

import { RepoService } from '../repo.service';
import { GlobalService } from '../global/global.service';



@Injectable({
  providedIn: 'root'
})
export class LessonService {

  @Output() fetchLessonsEvent = new EventEmitter<Lesson>();

  //Creating a lesson list for all the lessons in the service
  private _lessonList = new BehaviorSubject<Lesson[]>([]);

  //Return the lesson list as an observable
  public get lessonList(){
  return this._lessonList.asObservable();
}


  constructor(public repo: RepoService, private modalCtrl: ModalController,
   private global : GlobalService, public  alertCtrl: AlertController, public toastCtrl: ToastController) { 

     //Receive the lessons from the repo (API)
     this.repo.getLessons().subscribe(result => {
       console.log('Lesson List: Lesson Service -> Get Lessons');
       console.log(result);
      //  const tempResult = Object.assign(result);
       this._lessonList.next(result);
       console.log('Lesson List: Lesson Service -> Updated Lessons');
       console.log(this._lessonList);
     })
   }

   //Add a lesson to the lesson list within the lesson service 
  createLesson(l: any) : Promise<any> {

    return new Promise<any>((resolve, _) => {
      this.repo.createLesson(l)
      .subscribe({
        next: () => {
          this.fetchLessonsEvent.emit();
          resolve(true);
        },
        error: (e:any) => {
          this.fetchLessonsEvent.emit();
          resolve(false);
        }
      })
      .add(() => {
        this.global.endNativeLoad();
      })
    });

  }

  async duplicateAlert() {
    console.trace();
    const alert = await this.alertCtrl.create({
      header: 'Lesson Already Exists',
      message: 'The Lesson Information entered already exists on the system',
      buttons: ['OK']
    });
   alert.present();
  }

  getAllLessons(): Observable<any> {
    return this.repo.getLessons();
  }

  //Receives a lesson to update in the service lesson list.
  async updateLesson(id: number, l: any) : Promise<any> {
    return new Promise<any>((resolve, _) => {
      this.repo.updateLesson(id,l).subscribe({
        next: () => {
          this.fetchLessonsEvent.emit();
          this.dismissModal();
          this.sucUpdate();
          resolve(true);
        },
        error: () => {
          this.fetchLessonsEvent.emit();
          resolve(false);
        }
      }).add(() => { this.global.endNativeLoad(); });
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

  //Receives a lesson to delete in the service lesson list
  deleteLesson(id: string) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.global.nativeLoad("Deleting...");
      this.repo.deleteLesson(id).subscribe(
        {
          next: res => {
            this.fetchLessonsEvent.emit();
            resolve(true);
          },
          error: err => {
            resolve(false);
          }
        }
      ).add(() => {
        this.global.endNativeLoad();
      });
    });
  }

  //Modals
  //Add lesson info modal
  async addLessonInfoModal(lesson?: Lesson) {
    const modal = await this.modalCtrl.create({
      component: AddLessonComponent,
      componentProps:{
        lesson
      }
    });
    await modal.present();
  }

   //Display the update lesson modal.
  //This method receives the selected lesson object, from the employee page, in the modal through the componentProps.
  async updateLessonInfoModal(lesson: Lesson) {
    console.log('LessonService: UpdateLessonModalCall');
    const modal = await this.modalCtrl.create({
      component: UpdateLessonComponent,
      componentProps:{
        lesson
      }
    });
    await modal.present();
  }

  //Display the delete lesson modal.
  //This method receives the selected lesson object, from the lesson page, in the modal through the componentProps.
  async deleteLessonInfoModal(lesson: Lesson) {
    console.log('LessonService: DeleteLessonModalCall');

      const modal = await this.modalCtrl.create({
        component: DeleteLessonComponent,
          componentProps: {
            lesson,
        }
      });

      //Update the current employee list with the employee list from the delete modal.
      modal.onDidDismiss().then(() => {
        this.repo.getLessons().subscribe(result => {
          const tempResult = Object.assign(result);
          this._lessonList.next(tempResult);
          console.log('Updated lesson list: Lesson Service: delete lesson');
          console.log(this._lessonList);
        });
      });
      await modal.present();
    }

    //Display the view lesson modal.
    //This method receives the selected lesson object, from the lesson page, in the modal through the componentProps.
    async viewLessonInfoModal(lesson: Lesson) {
      console.log('LessonService: ViewLessonModalCall');
      let tempLesson = new Lesson();
      tempLesson = Object.assign(lesson);
      console.log(tempLesson);
      const modal = await this.modalCtrl.create({
        component: ViewLessonComponent,
        componentProps: {
          lesson:tempLesson
        }
      });
      await modal.present();
    }

     //Display the confirm create/update modal
  //Receives the selected lesson from the lesson page
  confirmLessonModal(choice: number, lesson: any) : Promise<any> {

    return new Promise<any>(async (resolve, _) => {
      console.log('LessonService: ConfirmLessonModalCall');
      console.log(choice);

      if(choice === 1){
        console.log('Performing ADD');
        const modal = await this.modalCtrl.create({
          component: ConfirmLessonComponent,
          componentProps: {
            choice,
            lesson
          }
        });
        //Update the current lesson list with the lesson list from the confirm modal.
        modal.onDidDismiss().then(() => {
          resolve(true);
        });
        await modal.present();

      } else if (choice === 2){

        console.log('Performing UPDATE');
        const modal = await this.modalCtrl.create({
          component: ConfirmLessonComponent,
          componentProps: {
            choice,
            lesson
          }
        });
        modal.onDidDismiss().then(() => {
          resolve(true);
        });
        await modal.present();
      } else {
        console.log('BadOption: ' + choice);
      }
    })
  }

  async AssociativeLessonComponent(lesson: any) {
    console.log("LessonService: AssociativeModalCall");
    const modal = await this.modalCtrl.create({
      component: AssociativeLessonComponent,
      componentProps: {
        lesson
      }
    });
    await modal.present();
  }
}


