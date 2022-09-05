import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { appUserRegister } from 'src/app/models/appUser';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { RepoService } from 'src/app/services/repo.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  titleList : any[] = [];
  isLoading = false;
  i = false;
  constructor(private authServ: AuthService, private repo : RepoService) { }

  ngOnInit() {

    //getting titles for drop down
    this.repo.getTitles().subscribe({
      next: (data : any) => {
        this.titleList = data.result;
      }
    });

  }

  onSubmit(registerForm: NgForm){
    if(!registerForm.valid) {return;}
    var userRegister = new appUserRegister();
    const d = new Date(registerForm.value.dob);
    const DOB_epoch = Math.trunc(d.getTime() / 1000);
    userRegister = {
      emailAddress : registerForm.value.emailAddress,
      password : registerForm.value.password,
      role: "client", //does not override role in api
      firstName: registerForm.value.firstName,
      lastName: registerForm.value.lastName,
      phoneNumber: registerForm.value.phone,
      TitleId: registerForm.value.TitleId,
      dob: DOB_epoch
    }
    console.log(userRegister);
    this.authServ.register(userRegister);
  }
  
}
