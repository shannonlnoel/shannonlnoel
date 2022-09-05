import { Component, Input, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { bookingLine } from 'src/app/models/cart';
import { Schedule } from 'src/app/models/schedule';
import { CartService } from 'src/app/services/cart.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss'],
})


export class AddBookingComponent implements ViewWillEnter {
  @Input() scheduleEvent: any;
  dateString: string;
  timeStart: string;
  timeEnd: string;

  constructor(public global:GlobalService, public cartService: CartService) { }

  ionViewWillEnter() {
    console.log(this.scheduleEvent);
    this.dateString = new Date(this.scheduleEvent.startTime).toDateString();
    this.timeStart = new Date(this.scheduleEvent.startTime).toLocaleTimeString();
    this.timeEnd = new Date(this.scheduleEvent.endTime).toLocaleTimeString();
    console.log(this.dateString);
    console.log(this.timeStart);
    console.log(this.timeEnd);
  }

  confirmChanges(){
    console.log();
    const index = this.scheduleEvent.scheduleID;
    var bookingItem: bookingLine = new bookingLine();
    bookingItem.scheduleID = this.scheduleEvent.scheduleID;
    bookingItem.schedule = this.scheduleEvent;
    this.cartService.addBooking(bookingItem);
    this.global.dismissModal();
    this.global.showToast("Booking event successfully added to your cart");
  }
}
