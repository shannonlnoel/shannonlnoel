import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {

  @Input() order : any;

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {
    console.log(this.order);
  }

  returnFrom() {
    this.modalCtrl.dismiss();
  }

}
