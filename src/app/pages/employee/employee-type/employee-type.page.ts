import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeType } from 'src/app/models/employeeType';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { RepoService } from 'src/app/services/repo.service';

@Component({
  selector: 'app-employee-type',
  templateUrl: './employee-type.page.html',
  styleUrls: ['./employee-type.page.scss'],
})
export class EmployeeTypePage implements OnInit {
  //String used from the searchbar, used in the filter pipe to search venues.
  filter: string;

  //Create local venue array to be populated onInit.
  employeeTypeList: EmployeeType[] = [];

  //Subscription variable to track live updates.
  employeeTypeSub: Subscription;

  isLoading = true;

  constructor(public employeeService: EmployeeService, public repo: RepoService) {
    this.fetchEmployeeTypes();
  }

  ngOnInit() {
    this.employeeService.fetchEmployeeTypesEvent.subscribe(
      {
        next: res => {
          console.log('EMIT TO GO FETCH THE EMPLOYEE TYPES AGAIN');
          this.fetchEmployeeTypes();
        }
      }
    );
  }

  fetchEmployeeTypes() {
    this.isLoading = true;
    this.employeeService.getAllEmployeeTypes().subscribe(
      {
        next: data => {
          console.log('FETCHING EMPLOYEE TYPES FROM DB');
          console.log(data.result);
          this.isLoading = false;
          this.employeeTypeList = data.result;
        }
      }
    );
  }



}
