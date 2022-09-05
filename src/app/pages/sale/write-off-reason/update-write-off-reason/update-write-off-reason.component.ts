import { Component, Input } from '@angular/core';
import { WriteOffReason } from 'src/app/models/write-off-reason'; 
import { InventoryService } from 'src/app/services/inventory/inventory.service'; 
import { GlobalService } from 'src/app/services/global/global.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-update-write-off-reason',
  templateUrl: './update-write-off-reason.component.html',
  styleUrls: ['./update-write-off-reason.component.scss'],
})
export class UpdateWriteOffReasonComponent implements ViewWillEnter {

  @Input() writeOffReason: WriteOffReason;

  uWriteOffReasonForm: UntypedFormGroup = new UntypedFormGroup({
    writeOffReasonDescription: new UntypedFormControl('', [Validators.required])
  });

  constructor(public global: GlobalService, public fb: UntypedFormBuilder,
    public writeOffReasonService: InventoryService) { }

  //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.uWriteOffReasonForm.controls;
  }

  ionViewWillEnter() {
    console.log('UpdateWriteOffReason-ViewWillEnter');
    console.log(this.writeOffReason);
    if (this.writeOffReason == null){
      this.global.showAlert("Write-off reason not passed to update","ERROR");
      this.global.dismissModal();
    }  else {
      this.uWriteOffReasonForm.controls.writeOffReasonDescription.setValue(this.writeOffReason.description);
    }
  }

  submitForm() {
    if
    (!this.uWriteOffReasonForm.valid) { //If the form has any validation errors, the form will not be submitted.
      console.log('Please provide all required fields');
      return false;
    }
    else
    {
      console.log('InsideUpdateSubmit:');
      var temp = new WriteOffReason();
      const choice = 2;
      temp = {
        writeOffReasonID: this.writeOffReason.writeOffReasonID,
        description: this.uWriteOffReasonForm.value['writeOffReasonDescription'],
        writeOffs: []
      };
       console.log(temp);
       this.writeOffReasonService.confirmWriteOffReasonModal(choice,temp);
       this.global.dismissModal();
    }
  }
}
