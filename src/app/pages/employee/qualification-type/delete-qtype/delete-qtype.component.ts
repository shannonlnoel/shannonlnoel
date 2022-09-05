import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController, ViewWillEnter, AlertController } from '@ionic/angular';
import { QualificationType } from 'src/app/models/qualification-type';
import { GlobalService } from 'src/app/services/global/global.service';
import { QualificationService } from 'src/app/services/qualification/qualification.service';


@Component({
  selector: 'app-delete-qtype',
  templateUrl: './delete-qtype.component.html',
  styleUrls: ['./delete-qtype.component.scss'],
})
export class DeleteQtypeComponent implements ViewWillEnter {
  @Input() qualificationType: QualificationType;

  constructor(private modalCtrl: ModalController, public formBuilder: UntypedFormBuilder,
    public qualificationService: QualificationService, public global: GlobalService) { }

  ionViewWillEnter() {
    console.log('DeleteQualificationType - ViewWillEnter');
    console.log(this.qualificationType);
  }

  //Send through the id of the selected venue to be deleted in the venue service.
  async delete(id: number){
    this.qualificationService.deleteQualificationType(id);
    await this.global.dismissModal();
    this.global.showToast('The qualification type has been successfully deleted!');
  }


}
