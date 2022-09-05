/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

import { Injectable, Output, EventEmitter } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { QualificationType } from 'src/app/models/qualification-type';
import { RepoService } from '../repo.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddQtypeComponent } from 'src/app/pages/employee/qualification-type/add-qtype/add-qtype.component';
import { DeleteQtypeComponent } from 'src/app/pages/employee/qualification-type/delete-qtype/delete-qtype.component';
import { UpdateQtypeComponent } from 'src/app/pages/employee/qualification-type/update-qtype/update-qtype.component';
import { ViewQtypeComponent } from 'src/app/pages/employee/qualification-type/view-qtype/view-qtype.component';
import { ConfirmQtypeComponent } from 'src/app/pages/employee/qualification-type/confirm-qtype/confirm-qtype.component';
import { AssociativeQtypeComponent } from 'src/app/pages/employee/qualification-type/associative-qtype/associative-qtype.component';
import { Qualification } from 'src/app/models/qualification';
import { AddQualificationComponent } from 'src/app/pages/employee/qualification/add-qualification/add-qualification.component';
import { UpdateQualificationComponent } from 'src/app/pages/employee/qualification/update-qualification/update-qualification.component';
import { AssociativeQualificationComponent } from 'src/app/pages/employee/qualification/associative-qualification/associative-qualification.component';
import { DeleteQualificationComponent } from 'src/app/pages/employee/qualification/delete-qualification/delete-qualification.component';
import { ViewQualificationComponent } from 'src/app/pages/employee/qualification/view-qualification/view-qualification.component';
import { ConfirmQualificationComponent } from 'src/app/pages/employee/qualification/confirm-qualification/confirm-qualification.component';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  @Output() fetchQualificationTypeEvent = new EventEmitter<QualificationType>();
  @Output() fetchQualificationEvent = new EventEmitter<Qualification>();


  constructor(public repo: RepoService, private modalCtrl: ModalController) {
    //Receive the qualifications and types from the repo (API).
    this.getAllQualification();
    this.getAllQualificationTypes();
  }


  //Methods
  //Add a qualificationtype to the qualificationtype list within the qualification service.
  createQualificationType(qualificationType: any) {
    this.repo.createQualificationType(qualificationType).subscribe(
      {
        next: () => {
          console.log('QUALIFICATION TYPE CREATED');
          this.fetchQualificationTypeEvent.emit(qualificationType);
        }
      }
    );
  }

  //Receives a venue to update in the service venue list.
  updateQualificationTypes(id: number, qualificationType: any) {
    if (id !== qualificationType.qualificationTypeID) {
      console.log('ERROR IN QUALIFICATION UPDATE - MISMATCH ID');
      return;
    }
    return this.repo.updateQualificationType(id, qualificationType).subscribe(
      {
        next: () => {
          console.log('VENUE UPDATED');
          this.fetchQualificationTypeEvent.emit(qualificationType);
        }
      }
    );
  }

  getAllQualificationTypes(): Observable<any> {
    return this.repo.getQualificationTypes();
  }

  //Receives a venue to delete in the service venue list.
  deleteQualificationType(id: number) {
    this.repo.deleteQualificationType(id).subscribe(result => {
      console.log('QUALIFICATION TYPE DELETED');
      this.fetchQualificationTypeEvent.emit();
    });

  }

  matchingQualificationType(input: string): Promise<any> {
    console.log('qualificationService: Repo -> Matching qualificationtype');
    return this.repo.getMatchQualificationType(input).toPromise();
  }

  //Qualification Methods
  //Add a qualification the qualification list within the qualification service.
  getAllQualification(): Observable<any> {
    return this.repo.getQualifications();
  }

  createQualification(qualification: any) {
    const QualificationTemp = {
      description: qualification.description,
      qualificationTypeID: qualification.qualificationType
    };
    console.log(QualificationTemp);

    this.repo.createQualification(QualificationTemp).subscribe(
      {
        next: () => {
          console.log('QUALIFICATION TYPE CREATED');
          this.fetchQualificationEvent.emit(qualification);
        }
      }
    );
  }


  //Receives a qualification to update in the service qualificationtype list.
  //Receives a venue to update in the service venue list.
  updateQualification(id: number, qualification: any) {
    return this.repo.updateQualification(id, qualification).subscribe(
      {
        next: () => {
          console.log('VENUE UPDATED');
          this.fetchQualificationEvent.emit(qualification);
        }
      }
    );
  }

  //Receives a qualification to delete in the service qualification list.
  deleteQualification(id: number) {
    this.repo.deleteQualification(id).subscribe(result => {
      console.log('QUALIFICATION  DELETED');
      this.fetchQualificationEvent.emit();
    });

  }

  matchingQualification(input: string): Promise<any>{
    console.log('Qualification Service: Repo -> Matching Qualification');
    return this.repo.getMatchQualification(input).toPromise();
   }

  //Modals
  async addQualificationTypeInfoModal(qualificationType?: QualificationType) {
    const modal = await this.modalCtrl.create({
      component: AddQtypeComponent,
      componentProps: {
        qualificationType
      }
    });
    await modal.present();
  }

  //Display the update venue modal.
  //This method receives the selected venue object, from the venue page, in the modal through the componentProps.
  async updateQualificationTypeInfoModal(qualificationType: QualificationType) {
    console.log('qualificationService: UpdateQualificationTypeModalCall');
    const modal = await this.modalCtrl.create({
      component: UpdateQtypeComponent,
      componentProps: {
        qualificationType
      }
    });
    await modal.present();
  }

  //Display the delete venue modal.
  //This method receives the selected venue object, from the venue page, in the modal through the componentProps.
  async deleteQualificationTypeInfoModal(qualificationType: QualificationType) {
    console.log('qualificationService: DeleteQualificationTypeModalCall');

    if (qualificationType.qualifications != null && qualificationType.qualifications.length > 0) {
      const modal = await this.modalCtrl.create({
        component: AssociativeQtypeComponent,
        componentProps: {
          qualificationType
        }
      });
      await modal.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: DeleteQtypeComponent,
        componentProps: {
          qualificationType
        }
      });
      await modal.present();

    }

  }
  //Display the view qualificationtype modal.
  //This method receives the selected qualificationtype object, from the qualificationtype page, in the modal through the componentProps.
  async viewQualificationTypeInfoModal(qualificationtype: QualificationType) {
    console.log('QualificationTypeService: ViewQualificationTypeModalCall');
    let tempQualificationType = new QualificationType();
    tempQualificationType = Object.assign(qualificationtype);
    console.log(tempQualificationType);
    const modal = await this.modalCtrl.create({
      component: ViewQtypeComponent,
      componentProps: {
        qualificationType: tempQualificationType
      }
    });
    await modal.present();
  }

  //Display the confirm create/update modal
  //Receives the selected qualificationtype from the qualificationtype page
  async confirmQualificationTypeModal(choice: number, qualificationType: any) {

    console.log('QualificationService: ConfirmQualificationTypeModalCall');
    console.log(choice);

    if (choice === 1) {
      console.log('Performing ADD');
      const modal = await this.modalCtrl.create({
        component: ConfirmQtypeComponent,
        componentProps: {
          qualificationType,
          choice
        }

      });
      await modal.present();
    } else if (choice === 2) {
      console.log('Performing UPDATE');
      const modal = await this.modalCtrl.create({
        component: ConfirmQtypeComponent,
        componentProps: {
          qualificationType,
          choice
        }
      });
      await modal.present();
    } else {
      console.log('BadOption: ' + choice);
    }
  }

  //Modals
  async addQualificationInfoModal(qualification?: Qualification) {
    const modal = await this.modalCtrl.create({
      component: AddQualificationComponent,
      componentProps: {
        qualification
      }
    });
    await modal.present();
  }

  //Display the update venue modal.
  //This method receives the selected venue object, from the venue page, in the modal through the componentProps.
  async updateQualificationInfoModal(qualification: Qualification) {
    console.log('qualificationService: UpdateQualificationModalCall');
    const modal = await this.modalCtrl.create({
      component: UpdateQualificationComponent,
      componentProps: {
        qualification
      }
    });
    await modal.present();
  }

  //Display the delete venue modal.
  //This method receives the selected venue object, from the venue page, in the modal through the componentProps.
  async deleteQualificationInfoModal(qualification: Qualification) {
    console.log('qualificationService: DeleteQualificationModalCall');

    if (qualification.qualificationTypeID != null) {
      const modal = await this.modalCtrl.create({
        component: AssociativeQualificationComponent,
        componentProps: {
          qualification
        }
      });
      await modal.present();

    } else {

      const modal = await this.modalCtrl.create({
        component: DeleteQualificationComponent,
        componentProps: {
          qualification
        }
      });
      await modal.present();
    }

  }
  //Display the view qualificationtype modal.
  //This method receives the selected qualification object, from the qualificationtype page, in the modal through the componentProps.
  async viewQualificationInfoModal(qualification: Qualification) {
    console.log('QualificationTypeService: ViewQualificationTypeModalCall');
    const modal = await this.modalCtrl.create({
      component: ViewQualificationComponent,
      componentProps: {
        qualification
      }
    });
    await modal.present();
  }

  //Display the confirm create/update modal
  //Receives the selected qualification from the qualification page
  async confirmQualificationModal(choice: number, qualification: any, qualificationType: string) {

    console.log('QualificationService: ConfirmQualificationModalCall');
    console.log(choice);

    if (choice === 1) {

      console.log('Performing ADD');
      const modal = await this.modalCtrl.create({
        component: ConfirmQualificationComponent,
        componentProps: {
          qualification,
          choice,
          qualificationType
        }
      });
      await modal.present();

    } else if (choice === 2) {

      console.log('Performing UPDATE');
      const modal = await this.modalCtrl.create({
        component: ConfirmQualificationComponent,
        componentProps: {
          qualification,
          choice,
          qualificationType
        }
      });
      await modal.present();
    } else {
      console.log('BadOption: ' + choice);
    }

  }

  async associativeVenueModal(qualification: Qualification) {
    console.log('QualificationService: AssociativeModalCall');
    const modal = await this.modalCtrl.create({
      component: AssociativeQualificationComponent,
      componentProps: {
        qualification
      }
    });
    await modal.present();
  }
}

