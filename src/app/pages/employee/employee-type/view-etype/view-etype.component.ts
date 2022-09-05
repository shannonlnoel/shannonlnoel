import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { EmployeeType } from 'src/app/models/employeeType';

@Component({
  selector: 'app-view-etype',
  templateUrl: './view-etype.component.html',
  styleUrls: ['./view-etype.component.scss'],
})
export class ViewEtypeComponent implements ViewWillEnter {
  @Input() employeeType: EmployeeType;

  constructor(private modalCtrl: ModalController, public fb: UntypedFormBuilder) { }

  ionViewWillEnter() {
    console.log('view Specific Employee Type -View Will Enter');
    console.log(this.employeeType);
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
