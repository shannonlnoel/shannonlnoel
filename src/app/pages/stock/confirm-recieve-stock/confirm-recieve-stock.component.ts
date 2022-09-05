import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { StockService } from 'src/app/services/stock/stock.service';
import { StockPage } from '../stock.page';

@Component({
  selector: 'app-confirm-recieve-stock',
  templateUrl: './confirm-recieve-stock.component.html',
  styleUrls: ['./confirm-recieve-stock.component.scss'],
})
export class ConfirmRecieveStockComponent implements OnInit {

  @Input() stock : any;
  count = 0;
  constructor(private global : GlobalService, private modalCtrl: ModalController, private stockService : StockService) { }

  ngOnInit() {
    console.log(this.stock);
    this.count = this.global.orderHash;
  }

  confirmChanges() {
    this.global.nativeLoad("Loading...");
    this.stockService.create(this.stock).subscribe({
      next: (data : any) => {
        this.modalCtrl.dismiss();
        this.stockService.fetchStockEvent.emit();
        this.global.showToast("Stock received successfully!")
      }
    }).add(() => { this.global.endNativeLoad() });
  }

  returnFrom() {
    this.modalCtrl.dismiss();
  }

}
