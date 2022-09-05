import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import { SalesService } from 'src/app/services/sales/sales.service';
import { StockService } from 'src/app/services/stock/stock.service';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { AddSitemComponent } from '../../sale/sale-item/add-sitem/add-sitem.component';
import { ConfirmRecieveStockComponent } from '../confirm-recieve-stock/confirm-recieve-stock.component';

@Component({
  selector: 'app-receive-stock',
  templateUrl: './receive-stock.component.html',
  styleUrls: ['./receive-stock.component.scss'],
})
export class ReceiveStockComponent implements OnInit {

  //form for creation
  cStockForm! : FormGroup;

  //Suppliers
  suppliers : any[] = [];
  saleitems : any[] = [];

  //to store the selected exercises
  id = 0;
  displaycount = 0;
  stock : any[] = [];
  validSaleItems = false;

  constructor(private saleItemService : SalesService, private supplierService : StockService, private modalCtrl : ModalController, private repo : RepoService, public global : GlobalService, private formBuilder : FormBuilder) { }

  ngOnInit() {

    this.cStockForm = this.formBuilder.group({
      supplier : ['', Validators.required],
      stocks: ['']
    });

    this.fetch();

    this.cStockForm.valueChanges.subscribe(() => {
      this.validateForm();
    });

  }

  async createNewSaleItem(){
    const modal = await this.modalCtrl.create({
      component: AddSitemComponent
    });
    await modal.present();
    this.saleItemService.fetchSaleItemsEvent.subscribe(() => {
      this.fetch();
    });
  }

  fetch() {
    this.global.nativeLoad("Loading...");
    this.repo.getSupplier().subscribe({
      next: (data : any) => {
        console.log(data)
        this.suppliers = data;
        console.log('suppliers',this.suppliers);
        this.repo.getSaleItems().subscribe({
          next: (items : any) => {
            console.log(items)
            this.saleitems = items.result;
            console.log('saleitems',this.saleitems)
          }
        }).add(() => { this.global.endNativeLoad() });
      }
    });
  }

  async submitForm() {

    const payload = {
      supplierID : this.cStockForm.value.supplier.split(',')[0],
      supplierName : this.cStockForm.value.supplier.split(',')[1],
      saleItems: [],
    }

    this.stock.forEach((el : any, i : number) => {
      payload.saleItems[i] = {
        saleItemId : el.saleItemId,
        quantity : el.quantity,
        name: el.name
      }
    });

    console.log(payload);

    this.supplierService.showConfirm(payload).then(() => {
      this.modalCtrl.dismiss();
    })

  }

  setSaleItem(item : any, event : any) {
    console.log(item, event);
    const index = this.stock.findIndex(e => e.id == item.id);
    this.stock[index].saleItemId = event.target.value.split(',')[0];
    const si = this.saleitems.find(e => e.saleItemID == event.target.value.split(',')[0]);
    this.stock[index].name = si.name;
    this.updateDisplayCount();
    this.validateForm();
  }

  setQuantity(item : any, event : any) {
    const index = this.stock.findIndex(e => e.id == item.id);
    this.stock[index].quantity = event.target.value;
    this.updateDisplayCount();
    this.validateForm();
  }

  addSaleItemSlot() {
    this.stock.push(new stockItem(this.id++));
  }

  removeStockToForm(item : any) {
    this.stock = this.stock.filter(el => el.id != item.id);
    this.updateDisplayCount();
    this.validateForm();
  }

  validateForm() { 

    this.validSaleItems = false;

    if (this.cStockForm.invalid || this.stock.length == 0)
      return;

    const test = this.stock.filter(e => e.saleItemId == -1);

    //console.log('tst', test);
    if (test.length != 0)
      return;

    const test2 = this.stock.filter(e => e.quantity == -1);
    
    if (test2.length != 0)
      return;

    this.validSaleItems = true;
  }

  updateDisplayCount() {
    this.stock.forEach((el : any, i : number) => {
      el.displaycount = i + 1;
    })
  }

}

export class stockItem {
  constructor(id : number) {
    this.id = id;
  }
  name : string;
  id : number;
  saleItemId : number = -1;
  quantity : number = -1;
  displaycount : number = 1;
}
