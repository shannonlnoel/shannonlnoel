import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EmployeeType } from 'src/app/models/employeeType';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-confirm-etype',
  templateUrl: './confirm-etype.component.html',
  styleUrls: ['./confirm-etype.component.scss'],
})
export class ConfirmEtypeComponent {
  @Input() choice: number;
  @Input() employeeType: EmployeeType;

  constructor(public global: GlobalService, public employeeService: EmployeeService,
    public router: Router, public activated: ActivatedRoute, public toastCtrl: ToastController) {
  }

  //1 = confirm ADD
  //2 = confirm UPDATE

  async checkMatch(name: string): Promise<boolean> {
    return this.employeeService.matchingEmployeeType(name).then(result => {
      console.log(result);
      if (result !== 0) {
        this.global.showAlert('The employee type information entered already exists on the system', 'Duplicate Entry');
        return true;
      } else {
        return false;
      }
    });
  }

  confirmChanges(employeeType: EmployeeType) {
    console.log(employeeType);
    this.checkMatch(employeeType.name).then(result => {
      console.log(result);
      if (result === true) {
        return;
      } else {
        if (this.choice === 1) {
          console.log('Add Employee Type from confirm:');
          //CallRepoToCreate
          this.employeeService.createEmployeeType(employeeType);
          this.global.showToast('The employee type has been successfully added!');
        } else if (this.choice === 2) {
          console.log('Update Venue from confirm:');
          //CallRepoToUpdate
          this.employeeService.updateEmployeeType(employeeType.employeeTypeID, employeeType);
          this.global.showToast('The employee type has been successfully updated!');
        }
      }
      //dismiss modal
      this.global.dismissModal();
    });

  }

  returnFrom() {
    //1 = return to ADD
    //2 = return to UPDATE
    if (this.choice === 1) {
      console.log(this.employeeType);
      this.global.dismissModal();
      this.employeeService.addEmployeeTypeInfoModal(this.employeeType);
    } else if (this.choice === 2) {
      console.log(this.employeeType);
      this.global.dismissModal();
      this.employeeService.updateEmployeeTypeInfoModal(this.employeeType);
    }
  }

}



