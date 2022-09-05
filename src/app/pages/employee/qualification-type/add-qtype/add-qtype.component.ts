import { Component, Input, OnInit  } from '@angular/core';
import { UntypedFormBuilder,FormControl, UntypedFormGroup, Validators } from '@angular/forms';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { QualificationType } from 'src/app/models/qualification-type';
import { GlobalService } from 'src/app/services/global/global.service';
import { QualificationService } from 'src/app/services/qualification/qualification.service';

@Component({
  selector: 'app-add-qtype',
  templateUrl: './add-qtype.component.html',
  styleUrls: ['./add-qtype.component.scss'],
})
export class AddQtypeComponent implements ViewWillEnter {
  @Input() qualificationType: QualificationType;

  //Creating the form to add the new venue details, that will be displayed in the HTML component
  cQTypeForm: UntypedFormGroup = this.formBuilder.group({
    qualificationTypeName: ['', [Validators.required]]
  });

  constructor(
    public global: GlobalService,
    public formBuilder: UntypedFormBuilder,
    public qualificationService: QualificationService,
    private  alertCtrl: AlertController ) { }

    //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.cQTypeForm.controls;
  }

  ionViewWillEnter(): void {
    if (this.qualificationType !=null){
      this.cQTypeForm.controls.qualificationTypeName.setValue(this.qualificationType.name);
    }

  }

  submitForm() {
    if (!this.cQTypeForm.valid){
      console.log('Please provide all required fields');
      return false;
    }else{
      const temp = {
        name: this.cQTypeForm.value['qualificationTypeName'],
        qualifications: []
      };
      this.global.dismissModal();
      this.qualificationService.confirmQualificationTypeModal(1,temp);
      
       //this.sucAdd();
      // console.log("CurrentRoute:ADD");
      // console.log(this.currentRoute.url);
    }
   }

  async duplicateAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Qualification Type Already Exists',
      message: 'The Qualification Type Information entered already exists on the system',
      buttons: ['OK']
    });
    alert.present();
  }

  async failureAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Could not create qualification type',
      message: 'There was an error updating the qualification type. Please try again',
      buttons: ['OK']
    });
    alert.present();
  }


}
