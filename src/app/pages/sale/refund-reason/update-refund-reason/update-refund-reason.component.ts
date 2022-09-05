import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { RefundReason } from 'src/app/models/refund-reason';
import { GlobalService } from 'src/app/services/global/global.service';
import { SalesService } from 'src/app/services/sales/sales.service';


@Component({
  selector: 'app-update-refund-reason',
  templateUrl: './update-refund-reason.component.html',
  styleUrls: ['./update-refund-reason.component.scss'],
})
export class UpdateRefundReasonComponent implements ViewWillEnter {
  @Input() refundReason: RefundReason;

  uRefundReasonForm: UntypedFormGroup = new UntypedFormGroup({
    refundReason: new UntypedFormControl('', [Validators.required]),
  });

  constructor(private global: GlobalService, public fb: UntypedFormBuilder,
    public saleService: SalesService) { }

  //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.uRefundReasonForm.controls;
  }

  ionViewWillEnter() {
    console.log('UpdateRefundReason-ViewWillEnter');
    console.log(this.refundReason);
    if (this.refundReason == null){
      this.global.showAlert('Refund Reason not passed to update','ERROR');
      this.global.dismissModal();
    }
    this.uRefundReasonForm.controls.refundReason.setValue(this.refundReason.description);
  }

  submitForm() {
    if (!this.uRefundReasonForm.valid) { //If the form has any validation errors, the form will not be submitted.
      console.log('Please provide all required fields');
      return false;
    }
    else
    {
      console.log('InsideUpdateSubmit:');
      let temp = new RefundReason();
      const choice = 2;
      temp = {
        refundReasonID: this.refundReason.refundReasonID,
        description: this.uRefundReasonForm.value.refundReason,
        refunds: null
      };
       console.log(temp);
       this.saleService.confirmRefundReasonModal(choice,temp);
       this.global.dismissModal();
    }
}

}
