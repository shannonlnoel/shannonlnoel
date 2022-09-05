/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { EventEmitter, Injectable, Output } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

import { EmployeeType } from 'src/app/models/employeeType';
import { AddEtypeComponent } from 'src/app/pages/employee/employee-type/add-etype/add-etype.component';
import { AssociativeEtypeComponent } from 'src/app/pages/employee/employee-type/associative-etype/associative-etype.component';
import { ConfirmEtypeComponent } from 'src/app/pages/employee/employee-type/confirm-etype/confirm-etype.component';
import { DeleteEtypeComponent } from 'src/app/pages/employee/employee-type/delete-etype/delete-etype.component';
import { UpdateEtypeComponent } from 'src/app/pages/employee/employee-type/update-etype/update-etype.component';
import { ViewEtypeComponent } from 'src/app/pages/employee/employee-type/view-etype/view-etype.component';

import { Employee } from 'src/app/models/employee';
import { AddEmployeeComponent } from 'src/app/pages/employee/employee-page/add-employee/add-employee.component';
import { AssociativeEmployeeComponent } from 'src/app/pages/employee/employee-page/associative-employee/associative-employee.component';
import { ConfirmEmployeeComponent } from 'src/app/pages/employee/employee-page/confirm-employee/confirm-employee.component';
import { DeleteEmployeeComponent } from 'src/app/pages/employee/employee-page/delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from 'src/app/pages/employee/employee-page/update-employee/update-employee.component';
import { ViewEmployeeComponent } from 'src/app/pages/employee/employee-page/view-employee/view-employee.component';

import { RepoService } from '../repo.service';
import { TitleService } from '../title/title.service';
import { Roles } from 'src/app/models/roles.enum';
import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  @Output() fetchEmployeesEvent = new EventEmitter<Employee>();
  @Output() fetchEmployeeTypesEvent = new EventEmitter<EmployeeType>();

//Creating an employee list for all the employees in the service
private _employeeList = new BehaviorSubject<Employee[]>([]);

//Return the employee list as an observable
public get employeeList(){
  return this._employeeList.asObservable();
}

private tempE: Employee[];

  constructor(public repo: RepoService, private modalCtrl: ModalController,
    public titleService: TitleService, private global : GlobalService, public  alertCtrl: AlertController) {
    //Receive the employee types from the repo (API).
    this.getAllEmployeeTypes();

    //Receive the employees from the repo (API)
    this.repo.getEmployees().subscribe(result => {
      console.log('Employee List: Employee Service -> Get Employees');
      console.log(result);
      const tempResult = Object.assign(result);
      this._employeeList.next(tempResult);
      console.log('Employee List: Employee Service -> Updated Employees');
      console.log(this._employeeList);
    })
  }

  //Methods
  //Add a employee type to the employee type list within the employee service.
  createEmployeeType(employeeType: any) {
    this.repo.createEmployeeType(employeeType).subscribe({
      next: () => {
        console.log('EMPLOYEE TYPE CREATED');
        this.fetchEmployeeTypesEvent.emit(employeeType);
      }
    });
  }

  //Add an employee to the employee list within the employee service 
  createEmployee(e: Employee) : Promise<any> {

    const tempEmp : any = {
      Name: e.Name,
      Surname: e.Surname,
      Photo: null,
      IDNumber: e.IDNumber,
      Phone: e.Phone,
      Email: e.Email,
      TitleID: e.TitleID.split(',')[0],
      EmployeeTypeID: e.EmployeeTypeID.split(',')[0],
      QualificationID: e.QualificationID.split(',')[0],
      Contract: null,
      role: e.role,
      EmployeeID: -1
    }

    //create payload:
    const payload = new FormData();
    payload.append(JSON.stringify(tempEmp), tempEmp);
    payload.append('contract', e.Contract);
    payload.append('photo', e.Photo);

    if (e.role == Roles.Admin) {
      //create admin employee:

      // return this.repo.createAdmin(payload)
      return new Promise<any>((resolve, _) => {
        this.repo.createAdmin(payload).subscribe({
          next: () => {
            this.fetchEmployeesEvent.emit();
            resolve(true);
          },
          error: (e:any) => {
            // this.fetchEmployeesEvent.emit();
            _(false);
            this.duplicateAlert();
          }
        })
        .add(() => { 
          this.global.endNativeLoad(); 
        });
      });
      // .subscribe(
      //   {
      //     next: () => {
      //       console.log('ADMIN CREATED');
      //       this.fetchEmployeesEvent.emit();
      //     }
      //   }
      // );

    } else {
      //create non-admin employee:

      return new Promise<any>((resolve, _) => {
        this.repo.createEmployee(payload)
        .subscribe({
          next: () => {
            this.fetchEmployeesEvent.emit();
            resolve(true);
          },
          error: (e:any) => {
            this.fetchEmployeesEvent.emit();
            _(false);
          }
        })
        .add(() => {
          this.global.endNativeLoad();
        })
      });
      // .subscribe(
      //   {
      //     next: () => {
      //       console.log('EMPLOYEE CREATED');
      //       this.fetchEmployeesEvent.emit();
      //     }
      //   }
      // );

    }

    // this.repo.createEmployee(payload).subscribe(
    //   {
    //     next: () => {
    //       console.log('EMPLOYEE CREATED');
    //       this.fetchEmployeesEvent.emit();
    //     }
    //   }
    // );

   }

   async duplicateAlert() {
    console.trace();
    const alert = await this.alertCtrl.create({
      header: 'Employee Already Exists',
      message: 'The Employee Information entered already exists on the system',
      buttons: ['OK']
    });
   alert.present();
  }

   getAllEmployees(): Observable<any> {
    return this.repo.getEmployees();
  }

  //Receives an employee type to update in the service venue list.
  updateEmployeeType(id: number, employeeType: any) {
    if (id !== employeeType.employeeTypeID) {
      console.log("ERROR IN EMPLOYEE TYPE UPDATE - MISMATCH ID");
      return;
    }
    return this.repo.updateEmployeeType(id, employeeType).subscribe(
      {
        next: () => {
          console.log('VENUE UPDATED');
          this.fetchEmployeeTypesEvent.emit();
        }
      }
    );
  }

  //Receives an employee to update in the service employee list
  async updateEmployee(e: Employee) : Promise<any> {
    // return this.repo.updateEmployee(employee).subscribe(
    //   {
    //    next: () => {
    //      console.log('EMPLOYEE UPDATED');
    //      this.fetchEmployeesEvent.emit(employee);
    //    },
    //    error: err => {
    //      console.log('EMPLOYEE UPDATED FAILED');
    //    }
    //   }
    // );

    let deletePhoto = false;
    if (e.Photo == null && e.srcPhoto == '')
      deletePhoto = true;

    let swapContract = false;
    if (e.Contract != null)
      swapContract = true;

    let swapPhoto = false;
    if (e.Photo != null)
      swapPhoto = true;

    const tempEmp: any = {
      Name: e.Name,
      Surname: e.Surname,
      Photo: e.Photo,
      IDNumber: e.IDNumber,
      Phone: e.Phone,
      Email: e.Email,
      TitleID: e.TitleID.split(',')[0],
      EmployeeTypeID: e.EmployeeTypeID.split(',')[0],
      QualificationID: e.QualificationID.split(',')[0],
      Contract: e.Contract,
      role: e.role,
      EmployeeID: e.EmployeeID,
      RemovePhoto: deletePhoto,
      SwapPhoto: swapPhoto,
      SwapContract: swapContract
    };

    console.log('e to api', tempEmp);
    //create payload:
    const payload = new FormData();
    payload.append(JSON.stringify(tempEmp), tempEmp);
    payload.append('contract', e.Contract);
    payload.append('photo', e.Photo);

    return new Promise<any>((resolve, _) => {
      this.repo.updateEmployee(payload).subscribe({
        next: () => {
          this.fetchEmployeesEvent.emit();
          resolve(true);
        },
        error: () => {
          this.fetchEmployeesEvent.emit();
          _(false);
        }
      }).add(() => { this.global.endNativeLoad(); });
    });

  }



  //Receives a employee type to delete in the service employee list.
  deleteEmployeeType(id: number) {
    this.repo.deleteEmployeeType(id).subscribe(result => {
      console.log('VENUE DELETED');
      this.fetchEmployeeTypesEvent.emit();
    });
  }

  deleteEmployee(id: string) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.global.nativeLoad("Deleting...");
      this.repo.deleteEmployee(id).subscribe(
        {
          next: res => {
            this.fetchEmployeesEvent.emit();
            resolve(true);
          },
          error: err => {
            resolve(false);
          }
        }
      ).add(() => {
        this.global.endNativeLoad();
      });
    });
  }

  getAllEmployeeTypes(): Observable<any> {
    return this.repo.getEmployeeTypes();
  }

  matchingEmployeeType(name: string): Promise<any>{
    return this.repo.getMatchEmployeeType(name).toPromise();
   }

   //matching employee
   matchingEmployee(input: string){
    console.log('employeeService: Repo -> Matching employee');
    this.repo.getMatchEmployee(input);
   }

  existingEmployeeType(id: number) {
    console.log('Employee Service: Repo -> Existing Employee Type');
    //this.repo.existsEmployeeType(id).subscribe(result =>
      //console.log(result));
  }

  //existing employee
  // existingEmployee(id: number){
  //   console.log('employeeService: Repo -> Existing Employee');
  //   this.repo.existsEmployee(id).subscribe(result =>
  //    console.log(result));
  //  }

  //Modals
  //Add employee info modal
  async addEmployeeInfoModal(employee?: Employee) {
    const modal = await this.modalCtrl.create({
      component: AddEmployeeComponent,
      componentProps:{
        employee
      }
    });
    await modal.present();
  }

  //add employee type
  async addEmployeeTypeInfoModal(employeeType?: EmployeeType) {
    const modal = await this.modalCtrl.create({
      component: AddEtypeComponent,
      componentProps: {
        employeeType
      }
    });
    await modal.present();
  }

  //Display the update employee modal.
  //This method receives the selected employee object, from the employee page, in the modal through the componentProps.
  async updateEmployeeInfoModal(employee: Employee) {
    console.log('EmployeeService: UpdateEmployeeModalCall');
    const modal = await this.modalCtrl.create({
      component: UpdateEmployeeComponent,
      componentProps:{
        employee
      }
    });
    await modal.present();
  }

  //Display the update employee type modal.
  //This method receives the selected employee type object, from the employee type page, in the modal through the componentProps.
  async updateEmployeeTypeInfoModal(employeeType: EmployeeType) {
    console.log('Employee Service: Update Employee Modal Call');
    const modal = await this.modalCtrl.create({
      component: UpdateEtypeComponent,
      componentProps: {
        employeeType
      }
    });
    await modal.present();
  }

  //Display the delete venue modal.
  //This method receives the selected venue object, from the venue page, in the modal through the componentProps.
  async deleteEmployeeTypeInfoModal(employeeType: EmployeeType) {
    console.log("VenueService: DeleteVenueModalCall");
    if (employeeType.employees != null && employeeType.employees.length > 0){
      const modal = await this.modalCtrl.create({
        component: AssociativeEtypeComponent,
          componentProps: {
            employeeType
        }
      });
      await modal.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: DeleteEtypeComponent,
          componentProps: {
            employeeType
        }
      });
      await modal.present();
    }
  }

  //Display the delete employee modal.
  //This method receives the selected employee object, from the employee page, in the modal through the componentProps.
  async deleteEmployeeInfoModal(employee: Employee) {
    console.log('EmployeeService: DeleteEmployeeModalCall');

      const modal = await this.modalCtrl.create({
        component: DeleteEmployeeComponent,
          componentProps: {
            employee,
        }
      });

      //Update the current employee list with the employee list from the delete modal.
      modal.onDidDismiss().then(() => {
        this.repo.getEmployees().subscribe(result => {
          const tempResult = Object.assign(result);
          this._employeeList.next(tempResult);
          console.log('Updated employee list: Employee Service: delete employee');
          console.log(this._employeeList);
        });
      });
      await modal.present();
    }

  //Display the view employee type modal.
    //This method receives the selected employee type object, from the employee type page, in the modal through the componentProps.
    async viewEmployeeTypeInfoModal(employeeType: EmployeeType) {
      console.log("VenueService: ViewVenueModalCall");
      const modal = await this.modalCtrl.create({
        component: ViewEtypeComponent,
        componentProps: {
          employeeType
        }
      });
      await modal.present();
    }

 //Display the view employee modal.
    //This method receives the selected employee object, from the employee page, in the modal through the componentProps.
    async viewEmployeeInfoModal(employee: Employee) {
      console.log('EmployeeService: ViewEmployeeModalCall');
      let tempEmployee = new Employee();
      tempEmployee = Object.assign(employee);
      console.log(tempEmployee);
      const modal = await this.modalCtrl.create({
        component: ViewEmployeeComponent,
        componentProps: {
          employee:tempEmployee
        }
      });
      await modal.present();
    }


  //Display the confirm create/update modal
  //Receives the selected venue from the venue page
  async confirmEmployeeTypeModal(choice: number, employeeType: any) {
    console.log('VenueService: ConfirmVenueModalCall');
    console.log(choice);
    if(choice === 1){
      console.log("Performing ADD");
      const modal = await this.modalCtrl.create({
        component: ConfirmEtypeComponent,
        componentProps: {
          employeeType,
          choice
        }
      });
      await modal.present();
    } else if (choice === 2){
      console.log("Performing UPDATE");
      const modal = await this.modalCtrl.create({
        component: ConfirmEtypeComponent,
        componentProps: {
          employeeType,
          choice
        }
      });
      await modal.present();
    } else {
      console.log("BadOption: " + choice);
    }
  }

    //Display the confirm create/update modal
  //Receives the selected employee from the employee page
  confirmEmployeeModal(choice: number, employee: Employee) : Promise<any> {

    return new Promise<any>(async (resolve, _) => {
      console.log('EmployeeService: ConfirmEmployeeModalCall');
      console.log(choice);

      if(choice === 1){
        console.log('Performing ADD');
        const modal = await this.modalCtrl.create({
          component: ConfirmEmployeeComponent,
          componentProps: {
            choice,
            employee
          }
        });
        //Update the current vat list with the vat list from the confirm modal.
        modal.onDidDismiss().then(() => {
          resolve(true);
        });
        await modal.present();

      } else if (choice === 2){

        console.log('Performing UPDATE');
        const modal = await this.modalCtrl.create({
          component: ConfirmEmployeeComponent,
          componentProps: {
            choice,
            employee
          }
        });
        modal.onDidDismiss().then(() => {
          resolve(true);
        });
        await modal.present();
      } else {
        console.log('BadOption: ' + choice);
      }
    })
    
  }

  async associativeEmployeeTypeModal(employeeType: EmployeeType) {
    console.log("EmployeeTypeService: AssociativeModalCall");
    const modal = await this.modalCtrl.create({
      component: AssociativeEtypeComponent,
      componentProps: {
        employeeType
      }
    });
    await modal.present();
  }

  async AssociativeEmployeeComponent(employee: any) {
    console.log("EmployeeTypeService: AssociativeModalCall");
    const modal = await this.modalCtrl.create({
      component: AssociativeEmployeeComponent,
      componentProps: {
        employee
      }
    });
    await modal.present();
  }

}

