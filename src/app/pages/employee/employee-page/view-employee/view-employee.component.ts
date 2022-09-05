import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController, ViewWillEnter, AlertController } from '@ionic/angular';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
})
export class ViewEmployeeComponent implements OnInit {
  @Input() employee: any;

  title! : string;
  employeeType! : string;
  qualification! : string;
  contract! : any;
  imgSrc = '';
  pdfSrc = '';


  constructor(private Http : HttpClient, private modalCtrl: ModalController, private toastCtrl: ToastController, public formBuilder: UntypedFormBuilder,
    public employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private alertCtrl: AlertController) { }


  ngOnInit() {
    console.log('emp', this.employee)
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  };

  downloadPdf() {
    window.open('https://testbsc.azurewebsites.net/Resources/Employees/Contracts/' + this.employee.data.contract);
  }

  createImg (fileName: string) {
    if (fileName == null)
      return `https://testbsc.azurewebsites.net/Resources/Employees/Images/default.jpeg`;
    return `https://testbsc.azurewebsites.net/Resources/Employees/Images/${fileName}`;
  }

  public createContract = (fileName: string) => `https://testbsc.azurewebsites.net/Resources/Employees/Contracts/${fileName}`;

}
