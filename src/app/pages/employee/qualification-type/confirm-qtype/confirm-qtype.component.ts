import { Component, Input } from '@angular/core';
import { QualificationType } from 'src/app/models/qualification-type';
import { GlobalService } from 'src/app/services/global/global.service';
import { QualificationService } from 'src/app/services/qualification/qualification.service';

@Component({
  selector: 'app-confirm-qtype',
  templateUrl: './confirm-qtype.component.html',
  styleUrls: ['./confirm-qtype.component.scss'],
})
export class ConfirmQtypeComponent {

  @Input() choice: number;
  @Input() qualificationType: QualificationType;

  constructor(public qualificationService: QualificationService, public global: GlobalService) {
   }

   async checkMatch(name:string): Promise<boolean>{
    return this.qualificationService.matchingQualificationType(name).then(data => {
      console.log("Check match result:");
      console.log(data);
       if (data != 0){
        let match = data.result;
        if (match.length > 1){
          this.global.showAlert("The qualification type information entered already exists on the system","Qualification Type Already Exists");
          return true;
        } else if (match.length == 1 && this.choice == 2 && match[0].qualificationTypeID == this.qualificationType.qualificationTypeID){
          alert("Matching itself in update");
          return false;
        } else {
          console.log("Must be in ADD, with exactly 1 other match: ");
          console.log("Choice: " + this.choice);
          this.global.showAlert("The qualification type information entered already exists on the system","Qualification Type Already Exists");
          return true;
        }
       } else {
         return false;
       }
     });
   }

   async confirmChanges(){
    //search duplicates
    await this.checkMatch(this.qualificationType.name).then(result =>{
      console.log(result);
      if (result == true){
         return;
       } else {
          if (this.choice === 1){
            console.log('Add booking type from confirm:');
            //CallRepoToCreate
            this.qualificationService.createQualificationType(this.qualificationType);
            this.global.dismissModal();
            this.global.showToast('The qualification type has been successfully added!');
        } else if (this.choice === 2){
            console.log('Update booking type from confirm:');
            //CallRepoToUpdate
            this.qualificationService.updateQualificationTypes(this.qualificationType.qualificationTypeID,this.qualificationType);
            this.global.dismissModal();
            this.global.showToast('The booking type has been successfully updated!');
          }
        }
      }
    )
  }

  // //1 = confirm ADD
  // //2 = confirm UPDATE
  // async confirmChanges(qualificationType: QualificationType){
  //   console.log(this.choice);
  //   if (this.choice === 1){
  //     //search duplicates
  //     if (this.qualificationService.matchingQualificationType(qualificationType.name) != null)
  //     {
  //       console.log('Existing Qualification Type: ' + qualificationType.name);
  //       this.global.showAlert('The qualification type information entered already exists on the system',
  //       'Duplicate Entry');
  //       return;
  //     }
  //     else {
  //       console.log('Add Qualification Type from confirm:');
  //       //CallRepoToCreate
  //       await this.qualificationService.createQualificationType(qualificationType);
  //       this.global.dismissModal();
  //       this.global.showToast('The qualification type has been successfully added!');
  //     }
  //   }

  //    else if (this.choice === 2){
  //     if (this.qualificationService.matchingQualificationType(qualificationType.name) != null)
  //     {
  //       console.log('Existing Qualification Type: ' + qualificationType.name);
  //       this.global.showAlert('The qualification type information entered already exists on the system',
  //       'Duplicate Entry');
  //       return;
  //     }
  //     else {
  //     console.log('Update Qualification Type from confirm:');
  //     //CallRepoToUpdate
  //     await this.qualificationService.updateQualificationTypes(qualificationType.qualificationTypeID,qualificationType);
  //     this.global.dismissModal();
  //     this.global.showToast('The qualification type has been successfully updated!');
  //     }
  //   }
  // }

  async returnFrom(){
      //1 = return to ADD
      //2 = return to UPDATE
    if (this.choice === 1){
      console.log(this.qualificationType);
      this.global.dismissModal();
      this.qualificationService.addQualificationTypeInfoModal(this.qualificationType);
    }
    else if (this.choice === 2){
      console.log(this.qualificationType);
      this.global.dismissModal();
      this.qualificationService.updateQualificationTypeInfoModal(this.qualificationType);
    }
  }
}
