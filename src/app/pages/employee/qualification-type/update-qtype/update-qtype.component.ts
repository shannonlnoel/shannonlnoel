/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController, ViewWillEnter } from '@ionic/angular';
import { QualificationType } from 'src/app/models/qualification-type';
import { GlobalService } from 'src/app/services/global/global.service';
import { QualificationService } from 'src/app/services/qualification/qualification.service';

@Component({
  selector: 'app-update-qtype',
  templateUrl: './update-qtype.component.html',
  styleUrls: ['./update-qtype.component.scss'],
})
export class UpdateQtypeComponent implements ViewWillEnter {

  @Input() qualificationType: QualificationType;

  uQTypeForm: UntypedFormGroup = new UntypedFormGroup({
    qualificationTypeName: new UntypedFormControl('', [Validators.required])
  });

  constructor(private modalCtrl: ModalController, public global: GlobalService, public fb: UntypedFormBuilder,
    public qualificationService: QualificationService) { }

  //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.uQTypeForm.controls;
  }

  ionViewWillEnter() {
      console.log('UpdateQualificationType-ViewWillEnter');
      console.log(this.qualificationType);
      this.uQTypeForm.controls.qualificationTypeName.setValue(this.qualificationType.name);
    //Populate the update qualification type form with the values received from the selected qualification type object in the main page.
  }

  submitForm() {
    if (!this.uQTypeForm.valid) { //If the form has any validation errors, the form will not be submitted.
      console.log('Please provide all required fields');
      this.global.showAlert('Please provide all required fields and ensure that the information is in the correct format');
      return false;
    }
    else
    {
      console.log('InsideUpdateSubmit:');
      let temp = new QualificationType();
      const choice = 2;
      temp = {
        qualificationTypeID: this.qualificationType.qualificationTypeID,
        name: this.uQTypeForm.value['qualificationTypeName'],
        qualifications: []
      };
        console.log(temp);
       this.qualificationService.confirmQualificationTypeModal(choice,temp);
       this.global.dismissModal();
    }
}

}
