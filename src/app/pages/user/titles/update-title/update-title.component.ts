/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { Title } from 'src/app/models/title';
import { GlobalService } from 'src/app/services/global/global.service';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  selector: 'app-update-title',
  templateUrl: './update-title.component.html',
  styleUrls: ['./update-title.component.scss'],
})
export class UpdateTitleComponent implements ViewWillEnter {
  @Input() title: Title;

  uTitleForm: UntypedFormGroup = new UntypedFormGroup({
    titleDescription: new UntypedFormControl('', [Validators.required])
  });

  constructor(public global: GlobalService, public fb: UntypedFormBuilder,
    public titleService: TitleService ) { }

    //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.uTitleForm.controls;
  }

  ionViewWillEnter() {
    console.log('UpdateTitle-ViewWillEnter');
    console.log(this.title);
    if (this.title != null){
      this.uTitleForm.controls.titleDescription.setValue(this.title.description);
    } else {
      this.global.showAlert('No title selected for update','Update Title Error');
      this.global.dismissModal();
    }
  }

  submitForm() {
    if (!this.uTitleForm.valid) { //If the form has any validation errors, the form will not be submitted.
      console.log('Please provide all required fields');
      this.global.showAlert('Please provide all required fields');
      return false;
    }
    else
    {
      console.log('InsideUpdateSubmit:');
      let temp = new Title();
      const choice = 2; //Update choice
      temp = {
        titleID: this.title.titleID,
        description: this.uTitleForm.value.titleDescription,
        //passing null does not change the users array
        users: null
      };
        console.log(temp);
       this.titleService.confirmTitleModal(choice,temp);
       this.global.dismissModal();
    }
}

}
