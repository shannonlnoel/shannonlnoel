/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { appUser } from 'src/app/models/appUser';
import { AuthService } from '../../services/authentication/auth.service';
import { GlobalService } from '../../services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passType = true;
  isLoggedin = false;

  constructor(private auth: AuthService, private router: Router, private global: GlobalService) { }

  ngOnInit(): void {

  }

  IonViewWillEnter() {
    this.isLogged();
  }

  updateIcn(){
    this.passType = !this.passType;
  }

  async isLogged(){
    // try{
    //   this.global.nativeLoad();
    //   const token = await this.storage.getId();
    //   console.log(val);
    //   if (val) {this.router.navigateByUrl('/home');}
    //   this.global.endNativeLoad();
    // } catch (err){
    //   console.log(err);
    // }
  }


  onSubmit(loginForm: NgForm){
    if(!loginForm.valid){
      console.log('Somehow invalid submission');
      return;
    }
    this.login(loginForm);
  }


 async login(loginForm: NgForm){
    let userLogin = new appUser();
    userLogin = {
      emailAddress : loginForm.value.emailAddress,
      //add password encryption here
      password : loginForm.value.password
    };
    await this.auth.login(userLogin);
  }
  
}
