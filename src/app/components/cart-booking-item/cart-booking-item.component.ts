import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart-booking-item',
  templateUrl: './cart-booking-item.component.html',
  styleUrls: ['./cart-booking-item.component.scss'],
})


export class CartBookingItemComponent {

  @Input() booking: any;
  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor() { }

  removeBooking() {
    this.remove.emit();
  }

}
