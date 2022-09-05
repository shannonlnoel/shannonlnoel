import { Component, Input, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { IonContent, ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { CartBookingItemComponent } from 'src/app/components/cart-booking-item/cart-booking-item.component';
import * as moment from 'moment';
import { StoreService } from 'src/app/services/storage/store.service';
import { SaleItem } from 'src/app/models/sale-item';
import { Schedule } from 'src/app/models/schedule';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements ViewWillEnter {

    model: Cart = null;
    cartSub: Subscription;
    //emptyCart = false; //Not currently being used

  constructor( private cartService: CartService,
      public global: GlobalService,
      public formBuilder: UntypedFormBuilder,
      public storage: StoreService
          ) {
            //this.getData();
            this.getData();
          }

   async ionViewWillEnter() {
    //Populate local model with cartService model
    //console.log("First doing get data then sub - disabled:");
    //await this.getData();
  }

  async getData(): Promise<any> {
    await this.cartService.getCartData().then((bool)=>{
      console.log("Getting data from cartService into item page local cartData: ", bool);
    });
    // await this.cartService.getCartData().then((model)=>{
    //   console.log("CartModal: Getting data from cartService: ",model);
    //   this.model = model;
    // });
    //Subscribe to cart observable on cartService for live changes
    this.cartSub = this.cartService.cart.subscribe(cart => {
      console.log('Loading cart subscription into local model:', cart);
      this.model = cart;
    });
  }

  checkout(){
    console.log(this.model);
    this.global.dismissModal();
    this.cartService.checkout(this.model);
   }

  quantityPlus(item:SaleItem) {
    //this.model.sales.indexOf(item)
    this.cartService.quantityPlus(item);
    //this.cartService.calculate();
  }

  quantityMinus(item:SaleItem){
    this.cartService.quantityMinus(item);
  }

  removeBooking(booking: Schedule){
    this.cartService.removeBooking(booking);
  }

  // quantityMinus(index) {
  //   //where does it update the local model?
  //   this.cartService.quantityMinus(index);
  //   console.log('Quantiy Minus:', this.model.sales);
  //   //this.cartService.calculate();
  //   if(this.model?.sales.length === 0){
  //     console.log("empty the sales basket of the cart");
  //     this.model.sales = null;
  //   }
  // }

  ionViewWillLeave() {
    console.log('ionViewWillLeave CartPage');
    if(this.model?.sales && this.model?.sales.length > 0) {
      this.cartService.saveCart();
    } else if (this.model?.bookings && this.model?.bookings.length > 0)
    this.cartSub.unsubscribe();
  }
}

       // this.payForm = this.formBuilder.group({
    //   merchant_id: ['10026801'],
    //   amount: ['100.00'],
    //   merchant_key: ['08fsf78tsgq70'],
    //   item_name: ['Pomodoro subscription']
    // });
  //  goForward() {
  //   this.nav.push(this.nextPage, { level: this.level + 1 });
  // }

  // goRoot() {
  //   this.nav.popToRoot();
  // }

  //  submit(){
  //   console.log('submitting payment')
  //  }

    // async makePayment() {
  //   // try {
  //   //   console.log('model: ', this.model);
  //   //   const data = {
  //   //     order: this.model.items,
  //   //     time: moment().format('lll'),
  //   //     total: this.model.totalPrice,
  //   //     grandTotal: this.model.grandTotal,
  //   //     status: 'Created',
  //   //     paid: 'COD'
  //   //   };
  //   //   console.log('order: ', data);
  //   //   await this.cartService.saveCartOrder(data);
  //   try{
  //     console.log('Leaving to payment page');
  //     this.global.dismissModal();
  //     this.router.navigate([this.router.url, 'payment']);

  //   } catch(e) {
  //     console.log(e);
  //   }
  // }
