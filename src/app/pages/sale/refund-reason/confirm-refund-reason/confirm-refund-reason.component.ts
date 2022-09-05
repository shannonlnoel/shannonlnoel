import { Component, Input, OnInit } from '@angular/core';
import { RefundReason } from 'src/app/models/refund-reason';
import { GlobalService } from 'src/app/services/global/global.service';
import { SalesService } from 'src/app/services/sales/sales.service';


@Component({
  selector: 'app-confirm-refund-reason',
  templateUrl: './confirm-refund-reason.component.html',
  styleUrls: ['./confirm-refund-reason.component.scss'],
})
export class ConfirmRefundReasonComponent{
  @Input() choice: number;
  @Input() refundReason: RefundReason;

  constructor(public global: GlobalService, public saleService: SalesService) {
  }

  async checkMatch(description:string): Promise<boolean>{
    console.log(description);
    return this.saleService.matchingRefundReason(description).then(data => {
      console.log("Check match result:");
      console.log(data);
       if (data != 0){
        let match = data.result;
        console.log(match);
        if (match.length > 1){
          this.global.showAlert("The refund reason information entered already exists on the system","Duplicate Entry");
          console.log(match.length);
          return true;
        } else if (match.length == 1 && this.choice == 2 && match[0].refundReasonID == this.refundReason.refundReasonID){
          alert("Matching itself in update");
          return false;
        } else {
          console.log("Must be in ADD, with exactly 1 other match: ");
          console.log("Choice: " + this.choice);
          this.global.showAlert("The refund reason information entered already exists on the system","Duplicate Entry");
          return true;
        }
       } else {
         return false;
       }
     });
   }



  //1 = confirm ADD
  //2 = confirm UPDATE
  async confirmChanges(refundReason: RefundReason){
    this.checkMatch(refundReason.description).then(result =>{
      console.log(result);
      if (result == true){
         return;
       } else {
          if (this.choice === 1){
          console.log('Add Refund Reason from confirm:');
          //CallRepoToCreate
          this.saleService.createRefundReason(refundReason);
          this.global.dismissModal();
          this.global.showToast('The refund reason has been successfully added!');
        } else if (this.choice === 2){
          console.log('Update Refund Reason from confirm:');
          //CallRepoToUpdate
          this.saleService.updateRefundReason(refundReason.refundReasonID,refundReason);
          this.global.dismissModal();
          this.global.showToast('The refund reason has been successfully updated!');
        }
      }
    }
  );
  }

  async returnFrom(){
    //1 = return to ADD
    //2 = return to UPDATE
    if (this.choice === 1){
      this.global.dismissModal();
      this.saleService.addRefundReasonInfoModal(this.refundReason);
    } else if (this.choice === 2){
      console.log(this.refundReason);
      this.global.dismissModal();
      this.saleService.updateRefundReasonInfoModal(this.refundReason);
    }
  }
}

