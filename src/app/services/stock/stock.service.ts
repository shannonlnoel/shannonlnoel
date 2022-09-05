import { EventEmitter, Injectable, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ConfirmRecieveStockComponent } from 'src/app/pages/stock/confirm-recieve-stock/confirm-recieve-stock.component';
import { RepoService } from '../repo.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  @Output() fetchStockEvent = new EventEmitter<any>();

  constructor(private repo : RepoService, private modalCtrl : ModalController) { }

  async showConfirm(payload : any) : Promise<any> {
    return new Promise<any>(async (resolve, _) => {
      const modal = await this.modalCtrl.create({
        component: ConfirmRecieveStockComponent,
        componentProps: {
          stock: payload
        }
      });
      modal.present();
      modal.onDidDismiss().then(() => {
        this.fetchStockEvent.emit();
        resolve(true);
      });
    });
  }

  create(stock : any) : Observable<any> {
    return this.repo.createStock(stock);
  }

}
