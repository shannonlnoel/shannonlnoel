import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SalesService } from 'src/app/services/sales/sales.service';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.page.html',
  styleUrls: ['./item-filter.page.scss'],
})
export class ItemFilterPage implements OnInit {
  tabs = {
    categories: true,
    price: false
  }
  categories: any[] = [];


  constructor( private modalCtrl: ModalController,
    public shopService: ShopService, public saleService: SalesService) {
      this.saleService.getAllSaleCategories().subscribe(
        {
          next: data => {
            this.categories = data.result;
            console.log(data);
          }
        }
      );
     }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  price_input() {
    this.shopService.priceRange.applied = true;
  }

  price_range(event) {
    let range = event.detail.value;
    this.shopService.priceRange.lower = range.lower;
    this.shopService.priceRange.upper = range.upper;
    this.shopService.priceRange.applied = true;
  }
  selectFilter(type: string) {
    Object.keys(this.tabs).forEach((value, index)=>{
      console.log('object :>> ', value, index);
      this.tabs[value] = false;
    })
    this.tabs[type] = true;
  }
  setFilter(i: number, type: string) {
    console.log('setFilter :>> ', i, type);
    if ('undefined' === typeof this.shopService[type][i]['isChecked']) {
      this.shopService[type][i]['isChecked'] = false;
    }
    this.shopService[type][i]['isChecked'] = !this.shopService[type][i]['isChecked'];
  } 
  applyFilter(){
    this.shopService.selectedCategories = this.shopService.categories.filter(val => val.isChecked);
    this.shopService.applyFilter();
    this.modalCtrl.dismiss(true);
    console.log("apply filer: sale items in shop service " ,this.shopService.saleItems)
  }
  clearFilter() {
    this.shopService.uncheckFilters();
    this.shopService.applyFilter();
    this.modalCtrl.dismiss(true);
  }
}
