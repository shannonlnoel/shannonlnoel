/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/semi */
import { Injectable, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Title } from 'src/app/models/title';
import { AddTitleComponent } from 'src/app/pages/user/titles/add-title/add-title.component';
import { DeleteTitleComponent } from 'src/app/pages/user/titles/delete-title/delete-title.component';
import { UpdateTitleComponent } from 'src/app/pages/user/titles/update-title/update-title.component';
import { ViewTitlesComponent } from 'src/app/pages/user/titles/view-titles/view-titles.component';
import { ConfirmTitleComponent } from 'src/app/pages/user/titles/confirm-title/confirm-title.component';
import { AssociativeTitleComponent } from 'src/app/pages/user/titles/associative-title/associative-title.component';
import { RepoService } from '../repo.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TitleService {

  @Output() fetchTitlesEvent = new EventEmitter<Title>();

  constructor(public repo: RepoService, private modalCtrl: ModalController ) {
    //Receive the venues from the repo (API).
    this.getAllTitles();
  }

  //READS:
  getAllTitles(): Observable<any> {
    return this.repo.getTitles();
  }
 
  matchingTitle(input: string): Promise<any>{
    console.log('titleService: Repo -> Matching Title');
    return this.repo.getMatchTitle(input).toPromise();
    }


  //CREATE:
  createTitle(title: any): any {
  this.repo.createTitle(title).subscribe(
    {
      next: (data) => {
        console.log("CREATE TITLE DATA:");
        console.log(data);
        this.fetchTitlesEvent.emit(title);
        return data;
      }, 
      error: (err) => {
        console.log("ERROR - CREATE TITLE DATA:");
        console.log(err);
        return err;
      }
    }
  )
  }

  //UPDATE:
   updateTitle(id: number,title: any):any {
     return this.repo.updateTitle(id,title).subscribe(
       {
        next: (data) => {
          console.log('UPDATED TITLE DATA:');
          console.log(data);
          this.fetchTitlesEvent.emit(title);
        },
        error: (err) => {
          console.log("ERROR - UPDATE TITLE DATA:");
          console.log(err);
          return err;
        }
       }
     )
   }

  //DELETE:
   deleteTitle(id: number){
    this.repo.deleteTitle(id).subscribe(result => {
      console.log('TITLE DELETED');
      this.fetchTitlesEvent.emit();
    });
   }  


  //MODALS:
  //CREATE
  async addTitleInfoModal(title?: Title) {
    const modal = await this.modalCtrl.create({
      component: AddTitleComponent,
      componentProps:{
        title
      }
    });
    await modal.present();
  }

  //UPDATE
  async updateTitleInfoModal(title: Title) {
    console.log("TitleService: UpdateTitleModalCall");
    const modal = await this.modalCtrl.create({
      component: UpdateTitleComponent,
      componentProps:{
        title
      }
    });
    await modal.present();
  }

  //DELETE
  async deleteTitleInfoModal(title: Title) {
    console.log("TitleService: DeleteTitleModalCall");
    if (title.users!= null && title.users.length > 0){
      const modal = await this.modalCtrl.create({
        component: AssociativeTitleComponent,
          componentProps: {
            title
        }
      });
      await modal.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: DeleteTitleComponent,
          componentProps: {
            title
        }
      });
      await modal.present();
    }
  }

  //ASSOCIATIVE
  async associativeTitleModal(title: Title) {
    console.log("TitleService: AssociativeModalCall");
    const modal = await this.modalCtrl.create({
      component: AssociativeTitleComponent,
      componentProps: {
        title
      }
    });
    await modal.present();
  }

  //VIEW
  async viewTitleInfoModal(title: Title) {
    console.log("TitleService: ViewTitleModalCall");
    const modal = await this.modalCtrl.create({
      component: ViewTitlesComponent,
      componentProps: {
        title
      }
    });
    await modal.present();
  }

  //CONFIRM
  async confirmTitleModal(choice: number, title: any) {
    console.log('TitleService: ConfirmTitleModalCall');
    console.log(choice);
    if(choice === 1){
      console.log("Performing ADD");
      const modal = await this.modalCtrl.create({
        component: ConfirmTitleComponent,
        componentProps: {
          title,
          choice
        }
      });
      await modal.present();

    } else if (choice === 2){

      console.log("Performing UPDATE");
      const modal = await this.modalCtrl.create({
        component: ConfirmTitleComponent,
        componentProps: {
          title,
          choice
        }
      });

      await modal.present();

    } else {

      console.log("BadOption: " + choice)

    }
  }
}
