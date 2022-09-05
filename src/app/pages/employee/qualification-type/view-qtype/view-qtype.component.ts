import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { QualificationType } from 'src/app/models/qualification-type';
import { GlobalService } from 'src/app/services/global/global.service';


@Component({
  selector: 'app-view-qtype',
  templateUrl: './view-qtype.component.html',
  styleUrls: ['./view-qtype.component.scss'],
})
export class ViewQtypeComponent implements ViewWillEnter {
  @Input() qualificationType: QualificationType;

  constructor(private modalCtrl: ModalController, public fb: UntypedFormBuilder, public global: GlobalService) {
  }

  ionViewWillEnter() {
    console.log('viewSpecificQualificationType-ViewWillEnter');
    console.log(this.qualificationType);
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
