import { Component, Input } from '@angular/core';
import { WriteOffReason } from 'src/app/models/write-off-reason'; 
import { InventoryService } from 'src/app/services/inventory/inventory.service'; 
import { GlobalService } from 'src/app/services/global/global.service';


@Component({
  selector: 'app-confirm-write-off-reason',
  templateUrl: './confirm-write-off-reason.component.html',
  styleUrls: ['./confirm-write-off-reason.component.scss'],
})
export class ConfirmWriteOffReasonComponent {

  @Input() choice: number;
  @Input() writeOffReason: WriteOffReason;

  constructor(public global: GlobalService, public writeOffReasonService: InventoryService ) { }

  async checkMatch(description:string): Promise<boolean>{
    return this.writeOffReasonService.matchingWriteOffReason(description).then(data => {
      console.log("Check match result:");
      console.log(data);
       if (data != 0){
        let match = data.result;
        if (match.length > 1){
          this.global.showAlert("The write-off reason information entered already exists on the system","Write-Off Reason Already Exists");
          return true;
        } else if (match.length == 1 && this.choice == 2 && match[0].writeOffReasonID == this.writeOffReason.writeOffReasonID){
          alert("Matching itself in update");
          return false;
        } else {
          console.log("Must be in ADD, with exactly 1 other match: ");
          console.log("Choice: " + this.choice);
          this.global.showAlert("The write-off reason information entered already exists on the system","Write-Off Reason Already Exists");
          return true;
        }
       } else {
         return false;
       }
     });
   }

  
  //1 = confirm ADD
  //2 = confirm UPDATE
  async confirmChanges(writeOffReason: WriteOffReason){
    //search duplicates
    await this.checkMatch(writeOffReason.description).then(result =>{
      console.log(result);
      if (result == true){
         return;
       } else {
          if (this.choice === 1){
            console.log('Add write-off reason from confirm:');
            //CallRepoToCreate
            this.writeOffReasonService.createWriteOffReason(writeOffReason);
            this.global.dismissModal();
            this.global.showToast('The write-off reason has been successfully added!');
        } else if (this.choice === 2){
            console.log('Update write-off reason from confirm:');
            //CallRepoToUpdate
            this.writeOffReasonService.updateWriteOffReason(writeOffReason.writeOffReasonID,writeOffReason);
            this.global.dismissModal();
            this.global.showToast('The write-off reason has been successfully updated!');
          }
        }
      }
    )
  }

  returnFrom(){
    //1 = return to ADD
    //2 = return to UPDATE
    if (this.choice === 1){
      console.log(this.writeOffReason);
      this.global.dismissModal();
      this.writeOffReasonService.addWriteOffReasonInfoModal(this.writeOffReason);
    } else if (this.choice === 2){
      console.log(this.writeOffReason);
      this.global.dismissModal();
      this.writeOffReasonService.updateWriteOffReasonInfoModal(this.writeOffReason);
    }
  }

}
