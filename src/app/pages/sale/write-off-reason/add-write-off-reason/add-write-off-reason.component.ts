/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { Component,  Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { WriteOffReason } from 'src/app/models/write-off-reason'; 
import { InventoryService } from 'src/app/services/inventory/inventory.service'; 
import { ViewWillEnter} from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-add-write-off-reason',
  templateUrl: './add-write-off-reason.component.html',
  styleUrls: ['./add-write-off-reason.component.scss'],
})
export class AddWriteOffReasonComponent implements ViewWillEnter  {

  @Input() writeOffReason: WriteOffReason;

   //Creating the form to add the new write-off reason details, that will be displayed in the HTML component
   cWriteOffReasonForm: UntypedFormGroup = this.formBuilder.group({
    writeOffReasonDescription: ['', [Validators.required]]
  });

  constructor(public global: GlobalService,  public formBuilder: UntypedFormBuilder,
    public writeOffReasonService: InventoryService ) { }

  //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.cWriteOffReasonForm.controls;
  }

  ionViewWillEnter(): void {
    console.log("AddWriteOffReason-ViewWillEnter");
    console.log(this.writeOffReason);
    if (this.writeOffReason !=null){
      this.cWriteOffReasonForm.controls.writeOffReasonDescription.setValue(this.writeOffReason.description);}
  }

  submitForm() {
    if (!this.cWriteOffReasonForm.valid){
      console.log(this.cWriteOffReasonForm.value['writeOffReasonDescription']);
      console.log('Please provide all required fields');
      return false;
    }
    else
    {
      const temp = {
        description: this.cWriteOffReasonForm.value['writeOffReasonDescription'],
        writeOffLines: []
      };
      this.global.dismissModal();
      this.writeOffReasonService.confirmWriteOffReasonModal(1,temp);
    }
   }

}
