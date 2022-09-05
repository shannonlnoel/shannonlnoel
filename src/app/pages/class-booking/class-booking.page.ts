import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-class-booking',
  templateUrl: './class-booking.page.html',
  styleUrls: ['./class-booking.page.scss'],
})
export class ClassBookingPage implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit() {
  }

}
