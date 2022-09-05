import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Qualification } from 'src/app/models/qualification';
import { QualificationType } from 'src/app/models/qualification-type';
import { GlobalService } from 'src/app/services/global/global.service';
import { QualificationService } from 'src/app/services/qualification/qualification.service';

@Component({
  selector: 'app-confirm-qualification',
  templateUrl: './confirm-qualification.component.html',
  styleUrls: ['./confirm-qualification.component.scss'],
})
export class ConfirmQualificationComponent{

  @Input() choice: number;
  @Input() qualification: Qualification;
  @Input() qualificationType: QualificationType;

  constructor(public qualificationService: QualificationService, public global: GlobalService) { }

  async checkMatch(description: string): Promise<boolean>{
    return this.qualificationService.matchingQualification(description).then(result => {
      console.log('matchresult', result);
       if (result){
         this.global.showAlert('The qualification information entered already exists on the system','Qualification Already Exists');
         return true;
       } else {
         return false;
       }
     });
   }
  //1 = confirm ADD
  //2 = confirm UPDATE
   confirmChanges(qualification: Qualification){
    console.log(qualification);
    this.checkMatch(qualification.description).then(result =>{
      console.log(result);
      if (result === true){
        return;
      } else {
        if (this.choice === 1){
            console.log('Add Venue from confirm:');
            //CallRepoToCreate
            this.qualificationService.createQualification(qualification);
            this.global.showToast('The qualification has been successfully added!');
        } else if (this.choice === 2){
          const temp = {
            description: qualification.description,
            qualificationTypeID: qualification.qualificationTypeID,
            employee: null
          };
            console.log('Update Venue from confirm:');
            console.log(qualification);
            console.log(qualification.qualificationID);
            console.log(temp);
            //CallRepoToUpdate
            this.qualificationService.updateQualification(qualification.qualificationID,temp);
            this.global.showToast('The qualification has been successfully updated!');
        }
      }
          //dismiss modal
          this.global.dismissModal();
    });
   }

   returnFrom(){
    //1 = return to ADD
    //2 = return to UPDATE
  if (this.choice === 1){
    console.log(this.qualification);
    this.global.dismissModal();
    this.qualificationService.addQualificationInfoModal(this.qualification);
  } else if (this.choice === 2){
    console.log(this.qualification);
    this.global.dismissModal();
    this.qualificationService.updateQualificationInfoModal(this.qualification);
  }
}
  }
