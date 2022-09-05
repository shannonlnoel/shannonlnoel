import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController, ViewWillEnter, AlertController } from '@ionic/angular';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss'],
})
export class DeleteEmployeeComponent implements OnInit {

  @Input() employee: any;

  title! : string;
  employeeType! : string;
  qualification! : string;
  contract! : any;
  imgSrc = '';
  pdfSrc = '';


  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, public formBuilder: UntypedFormBuilder,
    public employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private alertCtrl: AlertController) { }


  ngOnInit() {

  }

  //Send through the id of the selected employee to be deleted in the employee service.
  async delete(employee : any) {
    this.employeeService.deleteEmployee(employee.data.appUser.id).then(resp => {
      if (resp) {
        //deleted
        this.sucDelete();
        this.dismissModal();
      } else {
        //failed to delete due to links
        //call associative component here:
        this.employeeService.AssociativeEmployeeComponent(employee);
      }
    });

    // this.sucDelete();

  }
  
  async sucDelete() {
    const toast = await this.toastCtrl.create({
      message: 'The Employee has been successfully deleted!',
      duration: 2000
    });
    toast.present();
  }

  async failureAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Could not delete Employee',
      message: 'There was an error deleting the employee, please try again.',
      buttons: ['OK']
    });
    alert.present();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  };

  createImg (fileName: string) {
    if (fileName == null)
      return `https://testbsc.azurewebsites.net/Resources/Employees/Images/default.jpeg`;
    return `https://testbsc.azurewebsites.net/Resources/Employees/Images/${fileName}`;
  }

  public createContract = (fileName: string) => `https://testbsc.azurewebsites.net/Resources/Employees/Contracts/${fileName}`;

}


