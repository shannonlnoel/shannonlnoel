import { Component, Input, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { bookingLine, Cart, saleLine } from 'src/app/models/cart';
import { Vat } from 'src/app/models/vat';
import { Yoco } from 'src/app/models/yoco';
import { CartService } from 'src/app/services/cart.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { StoreService } from 'src/app/services/storage/store.service';
import { VatService } from 'src/app/services/vat/vat.service';
import { YocoService } from 'src/app/services/yoco/yoco.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements ViewWillEnter {
  @Input() cartData = {} as Cart;
  currentMethod = undefined;
  priceExcVat: number;
  vatList: Vat [] = [];


  constructor(public global: GlobalService, public cartService: CartService, public storage: StoreService, private yoco : YocoService, public vatService: VatService) { }

  ionViewWillEnter() {
    console.log(this.cartData);
    this.vatService.getAllVats().subscribe({
      next: (vatVal) => {
        console.log(vatVal);
        this.vatList = vatVal.result;
        let tempPrice = this.cartData.grandPriceTotal;
        let percentage = 100-(this.vatList[this.vatList.length-1].percentage);
        console.log(percentage);
        tempPrice = tempPrice * (percentage/100);
        console.log(tempPrice);
        this.priceExcVat = tempPrice;
      }
    })
  }


  async returnFrom(){
      this.global.dismissModal();
      this.cartService.openCart();
  }

  handleChange(e) {
    this.currentMethod = e.target.value;
  }

  async cashPay(){
    console.log(this.cartData);
    var saleItemArr: any[] = null;
    if (this.cartData['sales'] != null)
      if (this.cartData.sales.length>0){
        saleItemArr = [];
        this.cartData.sales.forEach(saleLine => {
          let tempSale = {
            saleItemID: saleLine.saleItemID,
            quantity: saleLine.quantity
          }
          saleItemArr.push(tempSale);
        })
      }
    console.log("Cash pay, sale item arr: ");
    console.log(saleItemArr);

    var bookingItemArr: bookingLine[] = null;
    if (this.cartData['bookings'] != null)
      if (this.cartData.bookings.length>0){
        bookingItemArr = [];
        this.cartData.bookings.forEach(bookingLine => {
          let tempBook = {
            scheduleID: bookingLine.scheduleID
          }
          bookingItemArr.push(tempBook);
        });
      }
    console.log("Cash pay, booking item arr: ");
    console.log(bookingItemArr);

    var payObj = { // Object to record sale on API
      userID: this.cartData.userId,
      paymentTypeID: 1,
      sales: saleItemArr,
      bookings: bookingItemArr,
      //clientID: this.cartData.userId
    }

    console.log(payObj);
    this.cartService.makePayment(payObj);
    this.global.dismissModal();
    this.global.showToast(this.currentMethod + " sale successfully recorded");
  }

  proceedToPayment(){
    console.log(this.cartData);
    this.global.nativeLoad("Processing Payment...");
    this.global.endNativeLoad();
    this.global.dismissModal();
    this.global.showToast(this.currentMethod + " sale successfully recorded");
  }

  cardPay() {
    const pl = new Yoco(this.cartData.grandPriceTotal * 100, 'ZAR', '');
    this.yoco
      .pay(pl)
      .subscribe(res => {
        if (res) {
          console.log(this.cartData);
          var saleItemArr: any[] = null;
          if (this.cartData['sales'] != null)
            if (this.cartData.sales.length>0){
              saleItemArr = [];
              this.cartData.sales.forEach(saleLine => {
                let tempSale = {
                  saleItemID: saleLine.saleItemID,
                  quantity: saleLine.quantity
                }
                saleItemArr.push(tempSale);
              })
            }
          console.log("Cash pay, sale item arr: ");
          console.log(saleItemArr);

          var bookingItemArr: bookingLine[] = null;
          if (this.cartData['bookings'] != null)
            if (this.cartData.bookings.length>0){
              bookingItemArr = [];
              this.cartData.bookings.forEach(bookingLine => {
                let tempBook = {
                  scheduleID: bookingLine.scheduleID
                }
                bookingItemArr.push(tempBook);
              });
            }
          console.log("Cash pay, booking item arr: ");
          console.log(bookingItemArr);

          var payObj = { // Object to record sale on API
            userID: this.cartData.userId,
            paymentTypeID: 2,
            sales: saleItemArr,
            bookings: bookingItemArr,
            //clientID: this.cartData.userId
          }

          console.log(payObj);
          this.cartService.makePayment(payObj);
          this.global.dismissModal();
          this.global.showToast(this.currentMethod + " sale successfully recorded");
        }
        else
          this.global.showAlert('Payment Failed, Please try again');
      });
  }

}
