import { Component,  Input } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { WriteOffReason } from 'src/app/models/write-off-reason'; 
import { InventoryService } from 'src/app/services/inventory/inventory.service'; 
import { ModalController, ViewWillEnter} from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { WriteOff } from 'src/app/models/write-off';
import { RepoService } from 'src/app/services/repo.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-write-off-sitem',
  templateUrl: './write-off-sitem.component.html',
  styleUrls: ['./write-off-sitem.component.scss'],
})
export class WriteOffSitemComponent implements ViewWillEnter {


  //employees
  employees : any[] = [];
  employeesLoadFlag = false;
  imgSrc = '';
  showImage = false;
  employeeDropDown: Employee[];

  //reasons
  reasons : any[] = [];
  reasonDropDown!: WriteOffReason[];
  reasonsLoadFlag = false;

  //to store the selected saleitems
  id = 0;
  displaycount = 0;
  saleItems : any[] = [];
  validSaleItems = false;

  @Input() saleItem: any;


  //Creating the form to add the new write-off details, that will be displayed in the HTML component
  cWriteOffForm: UntypedFormGroup = this.formBuilder.group({
    itemQuantity: ['', [Validators.required]],
    itemSReason: ['', [Validators.required]],
    itemSEmployee: ['', [Validators.required]]
  });

  constructor(public global: GlobalService,  public formBuilder: UntypedFormBuilder,
    public writeOffService: InventoryService, private repo : RepoService, private employeeService : EmployeeService, private modalCtrl : ModalController) { }

    //Used for validation within the form, if there are errors in the control, this method will return the errors.
  get errorControl() {
    return this.cWriteOffForm.controls;
  }

  ionViewWillEnter(): void {
    console.log("AddWriteOff-ViewWillEnter");
    console.log("Item:",this.saleItem);

    this.errorControl.itemQuantity.addValidators(Validators.max(this.saleItem.quantityOnHand));
    //fetch employees for the dropdown:
    //this.repo.getEmployees().subscribe({
    //  next: (data : any) => {
    //    console.log(data)
    //    console.log('employees',this.employees)
    //  }
    //}).add(() => { 
    //  this.employeesLoadFlag = true;
    //  this.checkEndLoad();
    //});

    //populating the dropdown for itemSReason:
    this.writeOffService.getAllWriteOffReasons().subscribe(
      {
        next: data => {
          this.reasonDropDown = data.result;
          console.log(data);
        }
      }
    );

    //populating the dropdown for itemSEmployee:
    this.employeeService.getAllEmployees().subscribe(
      {
        next: data => {
          this.employeeDropDown = data;
          console.log('Employees:',this.employeeDropDown);
        }
      }
    );
  }

  checkEndLoad() {
    if (this.employeesLoadFlag && this.reasonsLoadFlag) {
      this.global.endNativeLoad();
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  getEmpName(employee : any) {
    return `${employee.data.appUser.firstName} ${employee.data.appUser.lastName}`;
  }

  getEmpValue(employee : any) {
    return `${employee.data.employeeID}`;
  }

  getEmpData(employee : any) {
    return `${employee.data}`;
  }

  //getEmpSelected(employeeID : number) {
  //  console.log("EmpID", employeeID);
  //  this.repo.getEmployees().subscribe({
  //    next: (data : any) => {
  //      console.log(data)
  //      this.employees = data.filter(el => el.employeeID == employeeID);
  //      console.log('employee selected',this.employees)
  //      return this.employees;
  //    }
  //  });
  //}

  submitForm() {
    if (this.cWriteOffForm.invalid)
    {
      return;
    }  
    var quantitySelected: number = +this.cWriteOffForm.controls['itemQuantity'].value;
    var writeOffReasonSelected: number = +this.cWriteOffForm.value['itemSReason'].split(',')[0];
    var reasonDescription: string = this.cWriteOffForm.value['itemSReason'].split(',')[1];
    var saleItemSelected: number = +this.saleItem.saleItemID;
    var employeeSelected: number = +this.cWriteOffForm.value['itemSEmployee'].split(',')[0];
    var employeeName: string = this.cWriteOffForm.value['itemSEmployee'].split(',')[1];
    console.log()
    
    var obj: WriteOff = {
      employeeID: employeeSelected,
      writeOffLine: [{
        quantity: quantitySelected,
        writeOffReasonID: writeOffReasonSelected,
        saleItemID: saleItemSelected
      }]

    }
    console.log("Object", obj)
    console.log("EmployeeName", employeeName)
    console.log("Reason", reasonDescription)
    this.writeOffService.confirmWriteOffModal(obj, this.saleItem, employeeName, reasonDescription);
    this.global.dismissModal();
    return;
  }
}
