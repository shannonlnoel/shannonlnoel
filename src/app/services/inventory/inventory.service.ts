/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/semi */
import { Injectable, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WriteOffReason } from 'src/app/models/write-off-reason'; 
import { AddWriteOffReasonComponent } from 'src/app/pages/sale/write-off-reason/add-write-off-reason/add-write-off-reason.component'; 
import { DeleteWriteOffReasonComponent } from 'src/app/pages/sale/write-off-reason/delete-write-off-reason/delete-write-off-reason.component'; 
import { UpdateWriteOffReasonComponent } from 'src/app/pages/sale/write-off-reason/update-write-off-reason/update-write-off-reason.component'; 
import { ViewWriteOffReasonComponent } from 'src/app/pages/sale/write-off-reason/view-write-off-reason/view-write-off-reason.component'; 
import { ConfirmWriteOffReasonComponent } from 'src/app/pages/sale/write-off-reason/confirm-write-off-reason/confirm-write-off-reason.component'; 
import { AssociativeWriteOffReasonComponent } from 'src/app/pages/sale/write-off-reason/associative-write-off-reason/associative-write-off-reason.component'; 
import { RepoService } from '../repo.service';
import { Observable } from 'rxjs';
import { WriteOffSitemComponent } from 'src/app/pages/sale/sale-item/write-off-sitem/write-off-sitem.component';
import { WriteOff } from 'src/app/models/write-off';
import { SaleItem } from 'src/app/models/sale-item';
import { ViewWriteOffComponent } from 'src/app/pages/sale/write-off/view-write-off/view-write-off.component';
import { ConfirmWriteOffComponent } from 'src/app/pages/sale/sale-item/confirm-write-off-sitem/confirm-write-off-sitem.component';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  @Output() fetchWriteOffReasonsEvent = new EventEmitter<WriteOffReason>();
  @Output() fetchWriteOffsEvent = new EventEmitter<WriteOff>();

  constructor(public repo: RepoService, private modalCtrl: ModalController ) { 
    //Receive the write-off reasons from the repo (API).
    this.getAllWriteOffReasons();
    this.getAllWriteOffs();
  }

  //READS:
  getAllWriteOffReasons(): Observable<any> {
    return this.repo.getWriteOffReason();
  }

  //READS:
  getAllWriteOffs(): Observable<any> {
    return this.repo.getWriteOffs();
  }

  matchingWriteOffReason(input: string): Promise<any>{
    console.log('writeOffReasonService: Repo -> Matching WRITE-OFF REASON');
    return this.repo.getMatchWriteOffReason(input).toPromise();
  }

  //CREATE:
  createWriteOffReason(writeOffReason: any): any {
    this.repo.createWriteOffReason(writeOffReason).subscribe(
      {
        next: (data) => {
          console.log("CREATE WRITE-OFF REASON DATA:");
          console.log(data);
          this.fetchWriteOffReasonsEvent.emit(writeOffReason);
          return data;
        }, 
        error: (err) => {
          console.log("ERROR - CREATE WRITE-OFF REASON DATA:");
          console.log(err);
          return err;
        }
      }
    )
  }

  //CREATE:
  createWriteOff(writeOff: any): any {
    this.repo.createWriteOff(writeOff).subscribe(
      {
        next: (data) => {
          console.log("CREATE WRITE-OFF DATA:");
          console.log(data);
          this.fetchWriteOffsEvent.emit(writeOff);
          return data;
        }, 
        error: (err) => {
          console.log("ERROR - CREATE WRITE-OFF DATA:");
          console.log(err);
          return err;
        }
      }
    )
  }

  //UPDATE:
  updateWriteOffReason(id: number,writeOffReason: any):any {
    return this.repo.updateWriteOffReason(id,writeOffReason).subscribe(
      {
       next: (data) => {
         console.log('UPDATED WRITE-OFF REASON DATA:');
         console.log(data);
         this.fetchWriteOffReasonsEvent.emit(writeOffReason);
       },
       error: (err) => {
         console.log("ERROR - UPDATE WRITE-OFF REASON DATA:");
         console.log(err);
         return err;
       }
      }
    )
  }

  //DELETE:
  deleteWriteOffReason(id: number){
    this.repo.deleteWriteOffReason(id).subscribe(result => {
      console.log('WRITE-OFF REASON DELETED');
      this.fetchWriteOffReasonsEvent.emit();
    });
  }

  //MODALS:
  //CREATE REASON
  async addWriteOffReasonInfoModal(writeOffReason?: WriteOffReason) {
    const modal = await this.modalCtrl.create({
      component: AddWriteOffReasonComponent,
      componentProps:{
        writeOffReason
      }
    });
    await modal.present();
  }

  //CREATE 
  async addWriteOffInfoModal(saleItem?: SaleItem) {
    const modal = await this.modalCtrl.create({
      component: WriteOffSitemComponent,
      componentProps:{
        saleItem
      }
    });
    await modal.present();
  }

  //UPDATE
  async updateWriteOffReasonInfoModal(writeOffReason?: WriteOffReason) {
    console.log("WriteOffReasonService: UpdateWriteOffReasonModalCall");
    const modal = await this.modalCtrl.create({
      component: UpdateWriteOffReasonComponent,
      componentProps:{
        writeOffReason
      }
    });
    await modal.present();
  }

  //DELETE
  async deleteWriteOffReasonInfoModal(writeOffReason: WriteOffReason) {
    console.log("WriteOffReasonService: DeleteWriteOffReasonModalCall");
    if (writeOffReason.writeOffs!= null && writeOffReason.writeOffs.length > 0){
      const modal = await this.modalCtrl.create({
        component: AssociativeWriteOffReasonComponent,
          componentProps: {
            writeOffReason
        }
      });
      await modal.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: DeleteWriteOffReasonComponent,
          componentProps: {
            writeOffReason
        }
      });
      await modal.present();
    }
  }

  //ASSOCIATIVE
  async associativeWriteOffReasonModal(writeOffReason: WriteOffReason) {
    console.log("WriteOffReasonService: AssociativeWriteOffReasonModalCall");
    const modal = await this.modalCtrl.create({
      component: AssociativeWriteOffReasonComponent,
      componentProps: {
        writeOffReason
      }
    });
    await modal.present();
  }

  //VIEW
  async viewWriteOffInfoModal(writeOff: WriteOff) {
    console.log("WriteOffService: ViewWriteOffInfoModalCall");
    const modal = await this.modalCtrl.create({
      component: ViewWriteOffComponent,
      componentProps: {
        writeOff
      }
    });
    await modal.present();
  }

  //VIEW REASON
  async viewWriteOffReasonInfoModal(writeOffReason: WriteOffReason) {
    console.log("WriteOffReasonService: ViewWriteOffReasonInfoModalCall");
    const modal = await this.modalCtrl.create({
      component: ViewWriteOffReasonComponent,
      componentProps: {
        writeOffReason
      }
    });
    await modal.present();
  }

  //CONFIRM
  async confirmWriteOffModal(writeOff: any, saleItem: any, empName: string, reason: string) {
    console.log('WriteOffReasonService: ConfirmWriteOffReasonModalCall');
    console.log("Performing ADD");
    const modal = await this.modalCtrl.create({
      component: ConfirmWriteOffComponent,
      componentProps: {
        writeOff,
        saleItem,
        empName,
        reason
      }
    });
    await modal.present();
  }

  //CONFIRM
  async confirmWriteOffReasonModal(choice: number, writeOffReason: any) {
    console.log('WriteOffReasonService: ConfirmWriteOffReasonModalCall');
    console.log(choice);
    if(choice === 1){
      console.log("Performing ADD");
      const modal = await this.modalCtrl.create({
        component: ConfirmWriteOffReasonComponent,
        componentProps: {
          writeOffReason,
          choice
        }
      });
      await modal.present();

    } else if (choice === 2){

      console.log("Performing UPDATE");
      const modal = await this.modalCtrl.create({
        component: ConfirmWriteOffReasonComponent,
        componentProps: {
          writeOffReason,
          choice
        }
      });
      await modal.present();
    } 
    else 
    {
      console.log("BadOption: " + choice)
    }
  }

  
}
