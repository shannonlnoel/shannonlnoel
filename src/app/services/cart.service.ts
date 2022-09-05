/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { bookingLine, Cart, saleLine } from '../models/cart';
import { SaleItem } from '../models/sale-item';
import { CartModalPage } from '../pages/shop/cart-modal/cart-modal.page';
import { CheckoutComponent } from '../pages/shop/checkout/checkout.component';
import { PaymentPage } from '../pages/shop/payment/payment.page';
import { BookingService } from './booking/booking.service';
import { GlobalService } from './global/global.service';
import { RepoService } from './repo.service';
import { StoreService } from './storage/store.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  model: Cart = null; //Local cart page, used for translation
  private _cart = new BehaviorSubject<Cart>(null);//Dynamic cart obj

  get cart() { //Observable cart subscription
    return this._cart.asObservable();
  }

  constructor(
    private storage: StoreService,
    public global: GlobalService,
    private modalCtrl: ModalController,
    public repo: RepoService,
    public bookingService: BookingService
  ) { }

  async createCart(){
    var wasNull = false;
    if (this.model == null){
      wasNull = true;
      var userID: string = '';
      await this.storage.getKey('user').then((usr : any) => {
        const obj = JSON.parse(usr)
        userID = `${obj.id}`.toString();
        })
      this.model = {
      userId: userID,
      sales: [],
      bookings: [],
      grandPriceTotal: 0,
      grandItemTotal: 0
      }

    }
    if (wasNull){
      console.log("CartService.model was null, now after createCart: ",this.model);
    }
  }

  // getCartOrder(): any {
  //   return this.storage.getKey('order');
  // }

  async getCartData(): Promise<any> { //Return cart model from localStorage - ensure _cart is up to date
    console.log('CartService: GetCartData from localStorage or create it if empty');
    const data: any = await this.storage.getKey('cart');
    if (data == null){
      //console.log('cart is null in storage, create cart here');
      await this.createCart();
      await this.calculate();
      this._cart.next(this.model);
    } else {
      console.log('cart is not empty in storage, transfer to cart.service local model');
      this.model = await JSON.parse(data);
      await this.calculate();
      this._cart.next(this.model);
    }

    //Return model, either with empty booking and sales or retrieved cartData from localStorage
    return new Promise((resolve) => {
      console.log('cartService.getCartData: ', this.model);
      resolve(true);
    })
  }




  //Add a sales item
  async quantityPlus(sales:SaleItem) {
     try {
      //await this.createCart();
      var indx = -1;
      this.model.sales.forEach((saleLineItem, index) => {
        if (saleLineItem.saleItemID == sales.saleItemID){
          indx = index;
        }
       })

       if (indx == -1){
        let tempSaleAdd: saleLine = {
          saleItemID: sales.saleItemID,
          saleItem: sales,
          quantity: 1,
          subTotalPrice: 0
        }
        console.log("Indx in qty plus is -1, add entire saleLine obj to cart: ",tempSaleAdd);
        this.model.sales.push(tempSaleAdd);
       } else {
        ;
        this.model.sales[indx].quantity += 1;
        console.log("Indx in qty plus is "+indx+", only update quantity for it:"+this.model.sales[indx]);
       }
       await this.calculate();
       this._cart.next(this.model);
       await this.saveCart();
    } catch(e) {
      console.log(e);
      throw(e);
    }
  }


  //Add a booking item

  async addBooking(booking: bookingLine) {
    console.log('Cart Service: quantityPlus()');
    await this.createCart();
    try {
      let duplicate = false;
      this.model.bookings.forEach(bookLine => {
        if (bookLine.scheduleID == booking.scheduleID){
          console.log("Duplicate adding booking to cart");
          duplicate = true;
          return;
        }
      });

      if (!duplicate) {
        this.model.bookings[this.model.bookings.length] = ({...booking});
        console.log("booking added: ", this.model.bookings);
        this._cart.next(this.model);
        this.calculate();
        await this.saveCart();
        //console.log(this._cart.getValue());
      }


    } catch(e) {
      console.log(e);
      throw(e);
    }
  }

  //Minus sale item
  async quantityMinus(sales: SaleItem) {
    try {
      //await this.createCart();
      var indx = -1;
      this.model.sales.forEach((saleLineItem, index) => {
        console.log(saleLineItem);
        console.log(sales);
        if (saleLineItem.saleItemID == sales.saleItemID){
          indx = index;
        }
       })

       if (indx == -1){
        console.log("Indx in qty minus is -1, big error should never be able to minus something not in the cart");
        //this.model.sales.push(tempSaleAdd);
       } else {
        this.model.sales[indx].quantity -= 1;
       }
       await this.calculate();
       this._cart.next(this.model);
       await this.saveCart();
    } catch(e) {
      console.log(e);
      throw(e);
    }
  }

  //Remove booking
  async removeBooking(bookings?) {
    try {
      console.log(bookings);
      var indx = -1;
      this.model.bookings.forEach((bookingLineItem, index) => {
        console.log(bookingLineItem);
        if (bookingLineItem.scheduleID == bookings.scheduleID ){
          indx = index;
        }
       })

       if (indx == -1){
        console.log("Indx in remove booking is -1, big error should never be able to minus something not in the cart");
        //this.model.sales.push(tempSaleAdd);
       } else {
        this.model.bookings[indx] = null;
       }

      await this.calculate();
      this._cart.next(this.model);
    } catch(e) {
      console.log(e);
      throw(e);
    }
  }



  async calculate() {
    console.log("performing calculate");
    //If cart is empty, create it first
    //await this.createCart();
    this.model.grandItemTotal = 0;
    this.model.grandPriceTotal = 0;
     if (this.model.sales){
      let item = this.model.sales.filter(x => x.quantity > 0);
      this.model.sales = item;
      //console.log(this.model.sales);
      this.model.sales.forEach(element => {
        console.log(element);
          this.model.grandItemTotal += element.quantity;
          let salePrice = element.saleItem.priceHistory[element.saleItem.priceHistory.length-1].saleAmount;
          element.subTotalPrice = salePrice * element.quantity;
          this.model.grandPriceTotal += element.subTotalPrice;
        });
      }

      if (this.model.bookings){
        let item = this.model.bookings.filter(x => x!= null);
        this.model.bookings = item;
        this.model.bookings.forEach(element => {
            this.model.grandItemTotal += 1;
            let bookingPrice = element.schedule.bookingPriceHistory[element.schedule.bookingPriceHistory.length-1].amount;
            this.model.grandPriceTotal += bookingPrice;
          });
       }

        if (this.model.grandItemTotal === 0){
          this.model.grandPriceTotal = 0;
        }

        console.log("Finished calculations: ", this.model);
          this._cart.next(this.model);
  }

  //LocalStorage save cart
  async saveCart(model?) {
    if(model) {this.model = model;}
    await this.storage.setKey('cart', JSON.stringify(this.model));
  }
  //LocalStorage delete cart
  async clearCart() {
    //this.global.showLoader();
    await this.storage.deleteKey('cart');
    this._cart.next(null);
    this.model = null;
    //this.global.hideLoader();
  }



  //Will be called on Checkout.ts to process yoco payment
  async makePayment(payform: any){
    this.repo.makePayment(payform).subscribe(
      {
        next: (data) => {
          console.log(payform);
          //console.log(data);
        }
      }
    )
    await this.clearCart().then(() => {
      this.createCart();
    });

    this.bookingService.fetchBookingEvent.emit();
   }

  //Modal to open cart
  async openCart(){
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    await modal.present();
  }
  //Modal to open checkout page
  async checkout(cartData:any){
    const modal = await this.modalCtrl.create({
      component: CheckoutComponent,
      componentProps:{
        cartData
      }
    });
    modal.present();
  }

     // //Clear cart
  // async clearCartOrder() {
  //   await this.storage.deleteKey('order');
  // }

  // saveCartOrder(model) {
  //   this.storage.setKey('order', JSON.stringify(model));
  // }

}
