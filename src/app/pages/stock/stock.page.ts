import { Component, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Fuse from 'fuse.js';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import { StockService } from 'src/app/services/stock/stock.service';
import { ReceiveStockComponent } from './receive-stock/receive-stock.component';
import { ViewOrderComponent } from './view-order/view-order.component';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  searching = false;
  isLoading = true;
  searchTerm = '';
  noresults = false;
  stock : any[] = [];
  stockOriginal : any[] = [];
  suppliers : any[] = [];

  count = 1;

  constructor(private stockService : StockService, private repo : RepoService, private global : GlobalService, private modalCtrl : ModalController) { }

  ngOnInit() {
    this.stockService.fetchStockEvent.subscribe(() => {
      this.fetch();
      //this.modalCtrl.dismiss();
      this.stock = [];
      this.stockOriginal = [];
    });
    this.stockService.fetchStockEvent.emit();
  }

  fetch() {
    this.count = 1;
    this.noresults = false;
    this.global.nativeLoad("Loading...");
    this.repo.getSupplier().subscribe({
      next: (suppliers : any) => {
        this.repo.getAllStock().subscribe({
          next: (stock : any) => {
            this.stock = [];
            this.stockOriginal = [];
            console.log(stock, suppliers);
            this.isLoading = false;

            if (stock.length == 0) {
              this.noresults = true;
            }
            
            stock.forEach((el : any, i: number) => {
              this.stock.push({
                ...el,
                ...suppliers.find((supplier : any) => supplier.supplierID == el.supplierID),
                OrderNo: 0
              });
              this.stock[i].date = this.unixToDate(this.stock[i].date);
            });

            this.stock.forEach((el : any, i: number) => {
              this.stock[i].OrderNo = i + 1;
            });

            this.stockOriginal = this.stock;
            this.global.orderHash = this.count;

            console.log('final', this.stock);
          }
        }).add(() => { this.global.endNativeLoad() });
      }
    });
  }

  unixToDate(unix : number) {
    const date = new Date(unix * 1000);
    return date.toLocaleDateString();
  }

  searchOrder(event : string) {
    this.searching = true;

    this.searchTerm = event;

    if (this.searchTerm == '' || this.searchTerm == null) {
      this.searching = false;

      this.stock = this.stockOriginal;

      if (this.stock.length == 0) {
        this.noresults = true;
      }

      return;
    }

    const hits = new Fuse(this.stock, {
      keys: [
        'address',
        'cell',
        'name',
        'email',
        'saleItemOrders[].saleItems[].name',
      ]
    }).search(
      this.searchTerm
    );

    if (hits.length == 0) {
      this.noresults = true;
      return;
    }

    this.stock = [];
    hits.map((el : any) => {
      this.stock.push(el.item);
    });
  }

  itemCount(item : any) {
    return item.saleItemOrders.length;
  }

  async addOrder() {
    const modal = await this.modalCtrl.create({
      component: ReceiveStockComponent,
    });
    modal.present();
  }

  async viewOrder(order : any) {
    const modal = await this.modalCtrl.create({
      component: ViewOrderComponent,
      componentProps: {
        order
      }
    });
    modal.present();
  }

}
