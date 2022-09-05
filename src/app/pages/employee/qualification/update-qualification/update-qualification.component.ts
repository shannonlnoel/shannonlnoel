/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Qualification } from 'src/app/models/qualification';
import { QualificationType } from 'src/app/models/qualification-type';
import { GlobalService } from 'src/app/services/global/global.service';
import { QualificationService } from 'src/app/services/qualification/qualification.service';

@Component({
  selector: 'app-update-qualification',
  templateUrl: './update-qualification.component.html',
  styleUrls: ['./update-qualification.component.scss'],
})
export class UpdateQualificationComponent implements ViewWillEnter {
  @Input() qualification: Qualification;
  qualificationTypeDropDown!: QualificationType[];


  uQualificationForm: UntypedFormGroup = this.formBuilder.group({
    description: [, [Validators.required]],
    qualificationType: [, [Validators.required]],
  });

  //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.uQualificationForm.controls;
  }

  constructor(public global: GlobalService, public formBuilder: UntypedFormBuilder,
    public qualificationService: QualificationService) { }

    ionViewWillEnter() {
      console.log('Update Title-ViewWillEnter');
      console.log(this.qualification);
      this.qualificationService.getAllQualificationTypes().subscribe(
        {
          next: data => {
            this.qualificationTypeDropDown = data.result;
            console.log(data.result);
          }
        }
      );
      console.log('AddTitle-ViewWillEnter');
      console.log(this.qualification);
      if (this.qualification != null) {
        this.uQualificationForm.controls.description.setValue(this.qualification.description);
      }
    }

    submitForm() {
      if (!this.uQualificationForm.valid) { //If the form has any validation errors, the form will not be submitted.
        console.log('Please provide all required fields');
        this.global.showAlert('Please provide all required fields');
        return false;
      }
      else
      {
        console.log('InsideUpdateSubmit:');
        const temp = {
          qualificationID: this.qualification.qualificationID,
          description: this.uQualificationForm.controls['description'].value,
          qualificationTypeID: this.uQualificationForm.controls['qualificationType'].value.split(',')[0],
          employee: null
        };
        console.log(temp);
        this.qualificationService.confirmQualificationModal(2, temp, this.uQualificationForm.value['qualificationType'].split(',')[1]);
        this.global.dismissModal();
      }
  }

}
