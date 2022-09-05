import { Component, Input, OnInit } from '@angular/core';
import { ViewWillEnter} from '@ionic/angular';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
import { RefundReason } from 'src/app/models/refund-reason';
import { SalesService } from 'src/app/services/sales/sales.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-add-refund-reason',
  templateUrl: './add-refund-reason.component.html',
  styleUrls: ['./add-refund-reason.component.scss'],
})
export class AddRefundReasonComponent implements ViewWillEnter {

  @Input() refundReason: RefundReason;

   //Creating the form to add the new refund reason details, that will be displayed in the HTML component
   cRefundReasonForm: UntypedFormGroup = this.formBuilder.group({
    refundReason : ['', [Validators.required]]
  });

  constructor(private global: GlobalService, public formBuilder: UntypedFormBuilder,
    public saleService: SalesService) { }

    //Used for validation within the form, if there are errors in the control, this method will return the errors.
    get errorControl() {
      return this.cRefundReasonForm.controls;
    }

    ionViewWillEnter(): void {
      console.log("AddRefundReason-ViewWillEnter");
      console.log(this.refundReason);
      if (this.refundReason !=null){
        this.cRefundReasonForm.controls.refundReason.setValue(this.refundReason.description);}
      }

      submitForm() {
        if (!this.cRefundReasonForm.valid){
          console.log('Please provide all required fields');
          return false;
        }else{
          const temp = {
            description: this.cRefundReasonForm.value['refundReason'],
            refunds: null
          };
          this.global.dismissModal();
          this.saleService.confirmRefundReasonModal(1,temp);
        }
       }

}
