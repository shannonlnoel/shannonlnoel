/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, ToastController, ViewWillEnter } from '@ionic/angular';
import { EmployeeType } from 'src/app/models/employeeType';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-update-etype',
  templateUrl: './update-etype.component.html',
  styleUrls: ['./update-etype.component.scss'],
})
export class UpdateEtypeComponent implements ViewWillEnter {
  @Input() employeeType: EmployeeType;

  uEmployeeTypeForm: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required])
  });

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, public fb: UntypedFormBuilder,
    public employeeService: EmployeeService, private alertCtrl: AlertController, public global: GlobalService) { }

    //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.uEmployeeTypeForm.controls;
  }

  ionViewWillEnter() {
    console.log('UpdateVenue-ViewWillEnter');
    console.log(this.employeeType);
    this.uEmployeeTypeForm.controls.name.setValue(this.employeeType.name);
    this.uEmployeeTypeForm.controls.description.setValue(this.employeeType.description);
    //Populate the update title form with the values received from the selected title object in the main page.
  }

  submitForm() {
    if (!this.uEmployeeTypeForm.valid) { //If the form has any validation errors, the form will not be submitted.
      console.log('Please provide all required fields');
      this.InvalidAlert();
      return false;
    }
    else
    {
      console.log('InsideUpdateSubmit:');
      let temp = new EmployeeType();
      const choice = 2;
      temp = {
        employeeTypeID: this.employeeType.employeeTypeID,
        name: this.uEmployeeTypeForm.value['name'],
        description: this.uEmployeeTypeForm.value['description'],
        employees: []
      };
        console.log(temp);
       this.employeeService.confirmEmployeeTypeModal(choice,temp);
       this.global.dismissModal();
    }
  }

   async sucUpdate() {
     const toast = await this.toastCtrl.create({
       message: 'The Employee Type has been successfully updated!',
       duration: 2000,
       position : 'top'
     });
     toast.present();
   }

   async InvalidAlert() {
     const alert = await this.alertCtrl.create({
       header: 'Invalid Input',
       message: 'Please provide all required fields and ensure that the information is in the correct format',
       buttons: ['OK']
     });
     alert.present();
   }

   async DuplicateAlert() {
     const alert = await this.alertCtrl.create({
       header: 'Title Already Exists',
       message: 'The Title Information entered already exists on the system',
       buttons: ['OK']
     });
    alert.present();
  }

   async FailureAlert() {
     const alert = await this.alertCtrl.create({
       header: 'Could not update title',
       subHeader : 'There was an error updating the title. Please try again',
       //Enter SQL Code Error here
       message: 'SQL Code Error',
       buttons: ['OK']
     });
     alert.present();
   }
}
