import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import Fuse from 'fuse.js'
import { StoreService } from 'src/app/services/storage/store.service';
import { ModalController } from '@ionic/angular';
import { ViewPaymentComponent } from './view-payment/view-payment.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  payments : any[] = [];
  paymentsOriginal : any[] = [];

  constructor(private repo : RepoService, private global : GlobalService, private storage : StoreService, private modalCtrl : ModalController) { }

  ngOnInit() {

    this.global.nativeLoad("Loading...");
    this.repo.getPayments().subscribe({
      next: async (payments : any) => {
        const user = JSON.parse(await this.storage.getKey('user'));
        payments.result.filter((payment : any) => {
          return payment.paymentType.name == 'card' && payment.sale.appUser.id == user.id;
        }).forEach(element => {
          this.payments.push({
            ...element,
            ...{
              total: this.getTotal(element.sale.saleLine)
            },
            ...{
              count: element.sale.saleLine.length
            }
          });
        });;
        this.paymentsOriginal = this.payments;
      }
    }).add(() => { 
      this.global.endNativeLoad();
    });

  }

  async view(p : any) {
    const modal = await this.modalCtrl.create({
      component: ViewPaymentComponent,
      componentProps: {
        payment: p
      }
    });
    await modal.present();
  }

  getTotal(line : any[]) {
    console.log('line', line);
    let total = 0;
    line.forEach(element => {
      total += Number(element.quantity * element.saleItem.priceHistory[0].saleAmount);
    });
    return total;
  }

  searchPayment(evt : string) {
    if (evt.length == 0) {
      this.payments = this.paymentsOriginal;
      return;
    }

    const fuse = new Fuse(this.paymentsOriginal, {
      keys: [
        'sale.date',
      ]
    }).search(evt);

    if (fuse.length == 0) {
      this.payments = [];
      return;
    }

    this.payments = fuse.map((el : any) => {
      return el.item;
    });
  }

  getDate(date : string) {
    return new Date(date).toLocaleString();
  }

}
