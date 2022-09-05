import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.scss'],
})
export class ViewPaymentComponent implements OnInit {

  @Input() payment : any;

  constructor(public global : GlobalService) { }

  ngOnInit() {
    console.log('payment', this.payment);
  }

  getDate() {
    return new Date(this.payment.sale.date).toLocaleString();
  }

}
