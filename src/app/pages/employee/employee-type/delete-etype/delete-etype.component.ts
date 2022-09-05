import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { EmployeeType } from 'src/app/models/employeeType';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-delete-etype',
  templateUrl: './delete-etype.component.html',
  styleUrls: ['./delete-etype.component.scss'],
})
export class DeleteEtypeComponent implements ViewWillEnter {
  @Input() employeeType: EmployeeType;

  constructor(public global: GlobalService, public formBuilder: UntypedFormBuilder,
    public employeeService: EmployeeService) { }

    ionViewWillEnter() {
      console.log('Delete Employee Type - View Will Enter');
      console.log(this.employeeType);
    }

    //Send through the id of the selected venue to be deleted in the venue service.
  async delete(id: number){
    this.employeeService.deleteEmployeeType(id);
    this.global.dismissModal();
    this.global.showToast('The employee type has been successfully deleted!');
  }

}
