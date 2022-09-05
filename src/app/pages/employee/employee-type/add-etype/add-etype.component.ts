/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/dot-notation */
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController, ViewWillEnter } from '@ionic/angular';
import { EmployeeType } from 'src/app/models/employeeType';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';

@Component({
  selector: 'app-add-etype',
  templateUrl: './add-etype.component.html',
  styleUrls: ['./add-etype.component.scss'],
})
export class AddEtypeComponent implements ViewWillEnter {
  @Input() employeeType: EmployeeType;

  //Creating the form to add the new venue details, that will be displayed in the HTML component
  cEmployeeTypeForm: UntypedFormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });


  constructor(private modalCtrl: ModalController,public formBuilder: UntypedFormBuilder,
    public employeeService: EmployeeService, private router: Router, public global: GlobalService) { }

  //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.cEmployeeTypeForm.controls;
  }

  ionViewWillEnter(): void {
    console.log('Add Employee Type - View Will Enter');
    console.log(this.employeeType);
    if (this.employeeType != null) {
      this.cEmployeeTypeForm.controls.name.setValue(this.employeeType.name);
      this.cEmployeeTypeForm.controls.description.setValue(this.employeeType.description);
    }
  }

  submitForm() {
    if (!this.cEmployeeTypeForm.valid){
      console.log('Please provide all required fields');
      return false;
    }else{
      var temp = {
        name: this.cEmployeeTypeForm.value['name'],
        description: this.cEmployeeTypeForm.value['description']
      };
      this.employeeService.confirmEmployeeTypeModal(1,temp);
      this.global.dismissModal();
    }
   }

}
