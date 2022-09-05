import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AllRoles } from 'src/app/app-routing.module';
import { Employee } from 'src/app/models/employee';
import { Roles } from 'src/app/models/roles.enum';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import { StoreService } from 'src/app/services/storage/store.service';
import { TitleService } from 'src/app/services/title/title.service';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {

  @Input() employee : any;

  roles : any[] = [];
  titleList: any[] = [];
  employeeTypeList: any[] = [];
  qualificationList: any[] = [];
  qualificationTypeList: any[] = [];
  cEmployeeForm! : UntypedFormGroup;
  showRole = false;

  showProfile = false;
  noProfile = false;
  removedImage = false;
  validPhoto = true;

  photoFlag = false;
  contractFlag = true;

  imgSrc = '';
  pdfSrc = '';

  photo! : File;
  photoName! : string;
  newPhoto = false;
  deletePhoto = false;

  contract! : File;
  newContract = false;

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, public formBuilder: UntypedFormBuilder,
    public employeeService: EmployeeService, private router: Router,private currentRoute: ActivatedRoute,
    private alertCtrl: AlertController, public titleService: TitleService, public repo: RepoService, private storage : StoreService,
    public global : GlobalService) {
      //this.roles = AllRoles;
      this.storage.getKey('token').then((token : any) => {
        this.repo.getUserRole(token).subscribe({
          next: (data : any) => {
            //check for who you can create - superuser can create admins:
            const currRole = data.role;
            AllRoles.map((el : string) => {
              if (el != Roles.SuperUser && el != Roles.Client && el != Roles.Member) {
                //filter to remove super user if a super user
                if (currRole == Roles.SuperUser && el != Roles.SuperUser) {
                  this.pushBackRole(el);
                } else {
                  //the user is an admin
                  if (el != Roles.SuperUser && el != Roles.Admin) {
                    this.pushBackRole(el)
                  }
                }
              }
            })
          }
        })
      })
    }

    pushBackRole(el : string) {
      const temp = el;
      if (el == 'generalemployee') {
        el = 'General Employee';
      }
      this.roles.push({
        value: temp,
        role: el.substring(0, 1).toUpperCase() + el.substring(1, el.length)
      })
    }

  ngOnInit() {

    console.log(this.employee);

    this.cEmployeeForm = this.formBuilder.group({
      name: [this.employee.data.appUser.firstName, [Validators.required]],
      contract: [this.employee.data.contract, [this.validateContract]],
      email: [this.employee.data.appUser.email, [Validators.required, Validators.email]],
      surname: [this.employee.data.appUser.lastName, [Validators.required]],
      photo: ['', this.validatePhoto],
      idNumber: [this.employee.data.idNumber, [this.validateIDNumber]],
      phone: [this.employee.data.appUser.phoneNumber, [Validators.pattern(/[0-9]{10}/)]],
      titleId: ['', [Validators.required]],
      qualificationId : ['', Validators.required],
      employeeTypeId: ['', Validators.required],
      role: ['', Validators.required]
    });
    
    //getting employee types for drop down
      this.repo.getEmployeeTypes().subscribe({
        next: (data : any) => {
          this.employeeTypeList = data.result;
          this.setEmployeeType();
        }
      });
  
      //getting qualifications for drop down
      this.repo.getQualifications().subscribe({
        next: (data : any) => {
          this.qualificationList = data.result;
          this.setQualificationId();
        }
      });
  
      //getting titles for drop down
      this.repo.getTitles().subscribe({
        next: (data : any) => {
          this.titleList = data.result;
          this.setTitleId(this.titleList);
        }
      });

      setTimeout(() => {
        this.cEmployeeForm.get('role').setValue(this.employee.role[0]);
      }, 1000);

      //check if photo:
      if (this.employee.data.photo) {
        this.imgSrc = this.createImg();
        this.showProfile = true;
      } else {
        this.noProfile = true;
      }

      this.pdfSrc = this.createContract();
  
  }

  restoreImage() {
    this.photo = null;
    this.imgSrc = this.createImg();
    this.validPhoto = true;
    this.newPhoto = false;
    this.deletePhoto = false;
    this.removedImage = false;
    this.cEmployeeForm.get('photo').setValue(null);
    this.cEmployeeForm.get('photo').markAsUntouched();
  }

  removeImage() {
    this.removedImage = true;
    this.newPhoto = false;
    this.deletePhoto = true;
    this.photo = null;
    this.imgSrc = '';
    this.cEmployeeForm.get('photo').setValue(null);
    this.cEmployeeForm.get('photo').markAsUntouched();
  }

  restoreContract() {
    this.newContract = false;
    this.contract = null;
    this.pdfSrc = this.createContract();
    this.cEmployeeForm.get('contract').setValue(null);
    this.cEmployeeForm.get('contract').markAsUntouched();
  }

  setEmployeeType() {
    const id = this.employee.data.employeeType.employeeTypeID;
    const name = this.employee.data.employeeType.name;
    this.cEmployeeForm.get('employeeTypeId').setValue(`${id},${name}`)
  }

  setQualificationId() {
    const id = this.employee.data.qualification.qualificationID;
    const description = this.employee.data.qualification.description;
    this.cEmployeeForm.get('qualificationId').setValue(`${id},${description}`);
  }

  setTitleId(titles : any) {
    const description = this.employee.data.appUser.title.description;
    titles.map((el : any) => {
      if (el.description == description) {
        this.cEmployeeForm.get('titleId').setValue(`${el.titleID},${description}` );
        return;
      }
    })
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  get errorControl() {
    return this.cEmployeeForm.controls;
  }

  validateContract(contract : UntypedFormControl) : {[valtype : string] : string} | null {
    const pattern = /.((pdf))$/
    if (!pattern.test(contract.value)) {
      return {'errormsg' : 'Please submit .png, .jpg or .jpeg'}
    }
    return null;
  }

  validatePhoto(contract : UntypedFormControl) : {[valtype : string] : string} | null {
    const pattern = /.((png)|(jpg)|(jpeg))$/
    if (!pattern.test(contract.value)) {
      return {'errormsg' : 'Please submit .png, .jpg or .jpeg'}
    }
    return null;
  }

  validateIDNumber(id : UntypedFormControl) : {[valtype : string] : string} | null {
    let IDNum = id.value;

    const pattern = /^[0-9]{13}/;
    if (!pattern.test(IDNum)) {
      return {'errormsg' : 'Please enter id number'}
    }
    //validate with check digit:
    var checkdigit = 0;
    var count = 0;
    for (var i = 0; i < IDNum.length - 1; i++) {
      var multiple = count % 2 + 1;
      count++;
      var temp = multiple * + IDNum[i];
      temp = Math.floor(temp / 10) + (temp % 10);
      checkdigit += temp;
    }
    checkdigit = (checkdigit * 9) % 10;
    if (checkdigit != IDNum[IDNum.length - 1]) {
      return {'errormsg': 'Entered id number is not valid'}
    }
    return null;
  }

  submitForm() {
    
    if (!this.newContract) {
      //remove validator from contract and continue
      this.cEmployeeForm.get('contract').clearValidators();
    }
    const emp = new Employee();
    emp.EmployeeID = this.employee.data.appUser.id;
    emp.Name = this.cEmployeeForm.value['name'];
    emp.Surname = this.cEmployeeForm.value['surname'];
    emp.Photo = this.photo; //may be null
    emp.srcPhoto = this.imgSrc;
    emp.Contract = this.contract; //may be null
    emp.srcContract = this.pdfSrc;
    emp.IDNumber = this.cEmployeeForm.value['idNumber'];
    emp.Phone = this.cEmployeeForm.value['phone'];
    emp.Email = this.cEmployeeForm.value['email'];
    emp.TitleID = this.cEmployeeForm.value['titleId'];
    emp.EmployeeTypeID = this.cEmployeeForm.value['employeeTypeId'];
    emp.QualificationID = this.cEmployeeForm.value['qualificationId'];
    emp.role = this.cEmployeeForm.value['role'];

    console.log('e sending to the confirm for UpdateEmployeeComponent', emp)

    //create confirm modal here:
    this.employeeService.confirmEmployeeModal(2, emp).then(() => {
      this.dismissModal();
    })

  }

  addContract(event : any) {
    this.contractFlag = true;
    this.newContract = true;
    this.contract = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.pdfSrc = e.target.result;
    };
    reader.readAsArrayBuffer(this.contract);
  }

  addPhoto(event : any) {

    this.validPhoto = true;
    this.imgSrc = '';
    this.photo = null;
    this.photoFlag = true;

    if (!this.cEmployeeForm.get('photo').valid) {
      this.validPhoto = false;
      return;
    }

    this.newPhoto = true;
    this.removedImage = false;

    if (event.target.files.length == 0)
      return;

    this.photoFlag = true;
    this.photo = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event : any) => {
      this.imgSrc = event.target.result;
      this.showProfile = true;
    }
    reader.readAsDataURL(this.photo);

  }

  createImg () {
    if (this.employee.data.photo == null)
      return `https://testbsc.azurewebsites.net/Resources/Employees/Images/default.jpeg`;
    return `https://testbsc.azurewebsites.net/Resources/Employees/Images/${this.employee.data.photo}`;
  }

  public createContract = () => `https://testbsc.azurewebsites.net/Resources/Employees/Contracts/${this.employee.data.contract}`;

  

}
