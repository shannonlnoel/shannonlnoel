import { Component, Input, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Qualification } from 'src/app/models/qualification';
import { QualificationType } from 'src/app/models/qualification-type';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-qualification',
  templateUrl: './view-qualification.component.html',
  styleUrls: ['./view-qualification.component.scss'],
})
export class ViewQualificationComponent implements ViewWillEnter {
@Input() qualification: Qualification;
@Input() qualificationType: QualificationType;

  constructor(public global: GlobalService) { }

  ionViewWillEnter() {
    console.log('viewSpecificQualification-ViewWillEnter');
    console.log(this.qualification);
  }

}
