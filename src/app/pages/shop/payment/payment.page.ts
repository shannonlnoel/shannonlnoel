import { Component, OnInit } from '@angular/core';
import { IonNav } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  level = 0;
  nextPage = PaymentPage;

  constructor(private nav: IonNav) { }

  ngOnInit() {
  }

}
