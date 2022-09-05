import { CartService } from 'src/app/services/cart.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { RepoService } from 'src/app/services/repo.service';
import { TitleService } from 'src/app/services/title/title.service';
import { StoreService } from 'src/app/services/storage/store.service';
import { empty } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ConfirmIndemnityComponent } from './confirm-indemnity/confirm-indemnity.component';
import { appUserRegister } from 'src/app/models/appUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user! : any;

  indemnitySrc! : any;
  indemnityFlag = false;

  contractSrc! : any;
  contractFlag = false;

  titleList : any[] = [];
  // personalForm! : FormGroup;
  @ViewChild('personalForm') personalForm!: NgForm;
  isLoading = false;
  i = false;

  firstName! : any;
  lastName! : any;
  email! : any;
  phone! : any;
  title! : any;
  photo! : any;
  uploadPhoto! : File;
  client = true;
  AspId! : any;
  loading = true;
  showImage = false;
  IDNumber! : any;
  imgSrc = '';
  originalImg = '';

  //passwords:
  old = true;
  n1 = true;
  n2 = true;
  wrongold = false;
  success = false;
  fail = false;
  msg = '';

  constructor(private router : Router, private modalCtrl : ModalController, private repo : RepoService, private builder : FormBuilder, public global: GlobalService, public titleService: TitleService, public cartService: CartService, private storage : StoreService) { }

  ngOnInit() {
    this.setup();
  }

  downloadPdf() {
    window.open('https://testbsc.azurewebsites.net/Resources/Clients/Indemnity/Indemnity.pdf');
  }

  setup() {

    this.showImage = false;
    this.uploadPhoto = null;
    this.imgSrc = '';

    this.repo.getTitles().subscribe({
      next: (data : any) => {
        this.titleList = data.result;
      }
    });

    this.repo.getTitles().subscribe({
      next: (data : any) => {
        this.titleList = data.result;
        this.global.nativeLoad("Loading...");
        this.storage.getKey('token').then((token : any) => {
          console.log(token);
          this.repo.getUserRole(token).subscribe({
            next: (data : any) => {
              //query for the user:
              this.storage.getKey('user').then((usr : any) => {
                const u = JSON.parse(usr);
                this.repo.getUser(u.id).subscribe((usr : any) => {

                  console.log(usr);
                  this.loading = false;

                  if (data.role == 'client') {
                    this.AspId = usr.cli.userID;
                    this.firstName = usr.user[0].firstName;
                    this.lastName = usr.user[0].lastName;
                    this.email = usr.user[0].email;
                    this.phone = usr.user[0].phoneNumber;
                    this.title = usr.user[0].title;
                    if (usr.cli.photo != null || usr.cli.photo != undefined) {
                      this.imgSrc = this.createClientImg(usr.cli.photo);
                      this.originalImg = this.imgSrc;
                      this.showImage = true;
                    }
                    if(usr.cli.idemnity != null || usr.cli.idemnity != undefined) {
                      this.indemnitySrc = this.createIndemnity(usr.cli.idemnity);
                      this.indemnityFlag = true;
                    }
                    //populate the form:
                    this.personalForm.controls['firstName'].setValue(this.firstName);
                    this.personalForm.controls['lastName'].setValue(this.lastName);
                    this.personalForm.controls['email'].setValue(this.email);
                    this.personalForm.controls['dob'].setValue(this.convertToDate(usr.cli.dob));
                    this.personalForm.controls['number'].setValue(this.phone);
                    this.personalForm.controls['TitleId'].setValue(`${this.title.titleID},${this.title.description}`);

                  } 
                  else if (data.role == 'superuser') {
                    //this should be the logic for a superuser #TODO  

                  }
                  else {
                    this.client = false;
                    console.log(usr);
                    this.contractFlag = true;
                    this.IDNumber = usr.emp.data.idNumber
                    this.AspId = usr.emp.data.appUser.id;
                    if (usr.emp.data.photo != null || usr.emp.data.photo != undefined) {
                      this.photo = this.createEmpImg(usr.emp.data.photo);
                      this.showImage = true;
                    }
                    this.firstName = usr.user[0].firstName;
                    this.lastName = usr.user[0].lastName;
                    this.email = usr.user[0].email;
                    this.phone = usr.user[0].phoneNumber;
                    this.phone = usr.emp.data.appUser.phoneNumber;
                    this.contractSrc = this.createContract(usr.emp.data.contract);
                    this.titleList.map((title : any) => {
                      if (title.description == usr.emp.data.appUser.title.description) {
                        this.title = {
                          titleID: title.titleID,
                          description: title.description
                        }
                      }
                    })
                    this.client = false;
                  }
                  
                }).add(() => {
                  this.global.endNativeLoad();
                });
              }); 
            }
          });
        });

      }
    });
  }

  removePhoto() {
    this.imgSrc = '';
    this.uploadPhoto = null;
    this.showImage = false;
    this.personalForm.controls['photo'].setValue(``);
    if (this.originalImg != '') {
      this.imgSrc = this.originalImg;
      this.showImage = true;
    }
  }

  addPhoto(event : any) {

    this.imgSrc = '';
    this.uploadPhoto = null;
    this.showImage = false;

    if (event.target.files.length == 0)
      return;

    this.showImage = true;
    this.uploadPhoto = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event : any) => {
      this.imgSrc = event.target.result;
      this.showImage = true;
    }
    reader.readAsDataURL(this.uploadPhoto);

  }

  convertToDate(date : any) {
    const d = new Date(date * 1000);
    const year = d.getFullYear();
    var month = `${d.getMonth() + 1}`;
    var m = d.getMonth() + 1;
    if (m < 10) {
      month = `0${month}`;
    }
    var day =`${d.getDate()}`;
    var da = d.getDate();
    if (da < 10) {
      day = `0${da}`;
    }
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  }

  oldToggle(){
    this.old = !this.old;
  }

  n1Toggle() {
    this.n1 = !this.n1;
  }

  n2Toggle() {
    this.n2 = !this.n2;
  }

  changePassword(form : NgForm) {

    if (this.email == null) {
      this.fail = true;
      return;
    }

    const old = form.control.get('oldpassword').value;
    const newp = form.control.get('newpassword').value;

    const uvm = {
      EmailAddress: this.email,
      Password: old,
      newPassword: newp
    }

    this.global.nativeLoad("Setting...");
    this.repo.ChangePassword(uvm).subscribe({
      next: () => {
        this.global.showToast('Password changed successfully') //CHECKHERE
      },
      error: (msg : any) => {
        this.global.showAlert(msg.error); //CHECKHERE
      }
    }).add(() => { this.global.endNativeLoad(); });

  }

  async uploadIndemnity(event : any) {

    if (event == null)
      return;
    if (event.target.files.length < 0)
      return;
    const file = event.target.files[0];
    const indemnity = {
      file: file,
      id: this.AspId
    }

    const c : any = {
      AspId: this.AspId,
    }

    const payload = new FormData();
    payload.append(JSON.stringify(c), c);
    payload.append('indemnity', file);

    this.global.nativeLoad("Uploading...");
    this.repo.uploadIndemnity(payload).subscribe({
      next: () => {
        this.setup();
      },
      error: (err) => {
        console.log('err', err)
      }
    }).add(() => { this.global.endNativeLoad(); });

  }

  public createContract = (fileName: string) => {
    console.log(`https://testbsc.azurewebsites.net/Resources/Employees/Contracts/${fileName}`)
    return `https://testbsc.azurewebsites.net/Resources/Employees/Contracts/${fileName}`
  };

  public createIndemnity = (fileName: string) => {
    console.log(`https://testbsc.azurewebsites.net/Resources/Clients/Indemnity/${fileName}`)
    return `https://testbsc.azurewebsites.net/Resources/Clients/Indemnity/${fileName}`
  };

  onPersonalSubmit(personalForm: NgForm){

    if(!personalForm.valid)
      return;

      const d = new Date(personalForm.value.dob);
      const DOB_epoch = Math.trunc(d.getTime() / 1000);
      console.log(DOB_epoch);
      const c : any = {
        AspId : this.AspId,
        emailAddress : personalForm.value.email,
        role: "client", //does not override role in api
        firstName: personalForm.value.firstName,
        lastName: personalForm.value.lastName,
        phoneNumber: personalForm.value.number,
        TitleId: personalForm.value.TitleId.split(',')[0],
        dob: DOB_epoch
      }

      const payload = new FormData();
      payload.append(JSON.stringify(c), c);
      payload.append('photo', this.uploadPhoto);
      this.global.nativeLoad("Saving...")
      this.repo.updateClientInformation(payload).subscribe({
        next: () => {
          //this.setup();
          this.global.showAlert('Please log in again to update changes', "Successfully saved");
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('err', err)
        }
      }).add(() => { this.global.endNativeLoad(); });

  }

  ChangePassword(form : NgForm) {
    const newp = form.control.get('newpassword').value;
    this.storage.getKey('user').then((usr : any) => {
      const u = JSON.parse(usr);
      const uvm = {
        EmailAddress: u.email,
        newPassword: newp
      }
      this.global.nativeLoad("Setting...");
      this.repo.SetNewPassword(uvm).subscribe({
        next: () => {
            this.storage.deleteKey('email').then(() => {
            this.global.showToast("Password changed successfully.") //CHECKHERE
            // this.router.navigate(['/login']);
          });
        },
        error: (err : any) => {
          this.global.showAlert(err.error); //CHECKHERE
        }
      }).add(() => { this.global.endNativeLoad(); });
    });
  }

  onMeasurementSubmit(form : NgForm) {

  }

  
  createEmpImg (fileName: string) {
    if (fileName == null)
      return `https://testbsc.azurewebsites.net/Resources/Employees/Images/default.jpeg`;
    return `https://testbsc.azurewebsites.net/Resources/Employees/Images/${fileName}`;
  }

  createClientImg (fileName: string) {
    if (fileName == null)
      return `https://testbsc.azurewebsites.net/Resources/Clients/Images/default.jpeg`;
    return `https://testbsc.azurewebsites.net/Resources/Clients/Images/${fileName}`;
  }

}
