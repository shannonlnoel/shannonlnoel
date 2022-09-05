import { Injectable, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Vat } from 'src/app/models/vat';
import { AddVatComponent } from 'src/app/pages/sale/vat/add-vat/add-vat.component';
import { DeleteVatComponent } from 'src/app/pages/sale/vat/delete-vat/delete-vat.component';
import { ViewVatComponent } from 'src/app/pages/sale/vat/view-vat/view-vat.component';
import { ConfirmVatComponent } from 'src/app/pages/sale/vat/confirm-vat/confirm-vat.component';
import { RepoService } from '../repo.service';
import { Observable } from 'rxjs';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
  })
export class VatService {

  @Output() fetchVatsEvent = new EventEmitter<Vat>();

constructor(public repo: RepoService, private modalCtrl: ModalController, public global: GlobalService) {
  //Receive the venues from the repo (API).
  this.getAllVats();
  }

  //READS:
  getAllVats(): Observable<any> {
    return this.repo.getVats();
  }

  matchingVat(percentage: number, date: any): Promise<any> {
    console.log('vatService: Repo -> Matching Vat');
    return this.repo.getMatchVat(percentage, date).toPromise();
  }

  //CREATE
  createVat(VAT: any){
    var today = new Date();
    let vatTemp = {
      percentage : VAT.percentage,
      date: today.toISOString()
    }
    this.repo.createVAT(vatTemp).subscribe(
      {
        next: () => {
          console.log('VAT CREATED');
          this.fetchVatsEvent.emit(VAT);
        }
      }
    )
   }

  //DELETE:
   deleteVat(id: number){
    this.repo.deleteVat(id).subscribe(
      {
        next: res => {
          console.log(res);
          console.log('VAT DELETED');
          this.fetchVatsEvent.emit();
        },
        error: err => {
          console.log("ÉRROR HERE")
          console.log(err);
        }
      }
    );
   }




  //MODALS:
  //CREATE
  async addVatInfoModal(VAT?: Vat) {
    const modal = await this.modalCtrl.create({
      component: AddVatComponent,
      componentProps:{
        VAT
      }
    });
    await modal.present();
  }

  //DELETE
  async deleteVatInfoModal(VAT: Vat) {
    console.log("VatService: DeleteVatModalCall");
    
      const modal = await this.modalCtrl.create({
        component: DeleteVatComponent,
          componentProps: {
            VAT
        }
      });
      await modal.present();
    }
  
  //VIEW
  async viewVatInfoModal(VAT: Vat) {
    console.log("VatService: ViewVatModalCall");
    const modal = await this.modalCtrl.create({
      component: ViewVatComponent,
      componentProps: {
        VAT
      }
    });
    await modal.present();
  }

  //CONFIRM
  async confirmVatModal(VAT: any) {
    console.log('VatService: ConfirmVatModalCall');

      console.log("Performing ADD");
      const modal = await this.modalCtrl.create({
        component: ConfirmVatComponent,
        componentProps: {
          VAT
        }
      });

      //Update the current vat list with the vat list from the confirm modal.
      modal.onDidDismiss().then(() => {

        this.repo.getVats();

      });

      await modal.present();
  }
}
