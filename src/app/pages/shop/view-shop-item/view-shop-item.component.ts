import { Component, Input, OnInit } from '@angular/core';
import { SaleItem } from 'src/app/models/sale-item';
import { CartService } from 'src/app/services/cart.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { SalesService } from 'src/app/services/sales/sales.service';

@Component({
  selector: 'app-view-shop-item',
  templateUrl: './view-shop-item.component.html',
  styleUrls: ['./view-shop-item.component.scss'],
})
export class ViewShopItemComponent {
  //Create local title array to be populated onInit.
  items: any[] = [];
  saleItems: any[] = [];

  @Input() saleItem: SaleItem;
  @Input() categoryName: string;

  isLoading = false;


  constructor(public global: GlobalService, public cartService: CartService,public saleService: SalesService ) {
    this.fetchSaleItem();
  }

  quantityPlus(item) {
    console.log("Performing view shop item operation: qtyPlus: ", item);
    const index = this.saleItems.findIndex(x => x.saleItemID === item.saleItemID);
    console.log(index);
    if (!this.saleItems[index].quantity) {
      console.log('index item: ', this.saleItems);
      this.cartService.quantityPlus(item);
    } else {
      // alert for clear cart
      // this.cartService.alertClearCart(index, this.saleItems);
    };
    this.global.showToast('Item successfully added to cart');
    this.global.dismissModal();
  }

  fetchSaleItem() {
    this.isLoading = true;
    this.saleService.getAllSaleItems().subscribe(
      {
        next: data => {
          console.log('Fetching items from DB');
          console.log(data);
          this.isLoading = false;
          this.saleItems = data.result;

        }
      }
    );
  }



}
