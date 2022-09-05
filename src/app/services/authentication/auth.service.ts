import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { appUser, appUserRegister } from 'src/app/models/appUser';
import { GlobalService } from '../global/global.service';
import { RepoService } from '../repo.service';
import {StoreService} from '../storage/store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //////////////
  //navbar authentication with observable
  private loggedIn = new BehaviorSubject<boolean>(false);

  async checkToken() {
    var token = await this.storage.getKey('token');
    if (token == null) {
      this.loggedIn.next(false);
    }
    else {
      var tokenObj = this.global.decodeToken(token);
      if (tokenObj == null) {
        this.loggedIn.next(false);
      }
      else if (!this.global.validateTokenData(tokenObj)) {
        this.loggedIn.next(false);
      }
      else this.loggedIn.next(true);
    }
  }

  get isLoggedIn() {
    this.checkToken();
    return this.loggedIn.asObservable();
  }

  navLogin() {
    this.loggedIn.next(true);
    console.log('navLogin called');
  }

  navLogout() {
    this.loggedIn.next(false);
  }

  async getState() {
    await this.checkToken();
    return this.loggedIn.value;
  }
  //////////////

  constructor(
    private repo: RepoService,
    private global: GlobalService,
    private storage: StoreService,
    private router: Router) { }

  register(registerUser: appUserRegister) {
    this.storage.deleteKey('token').then(() => {
      this.global.nativeLoad("Registering...");
      this.repo.register(registerUser).subscribe(result => {
        this.router.navigate(['login']);
      }).add(() => { this.global.endNativeLoad(); });
    });
    
  }

  async login(appUser: appUser) {
    await this.storage.deleteKey('token');
    await this.global.nativeLoad('loading...');
    return this.repo.login(appUser).subscribe(async (result : any) => {
      var token = result.value.token;
      await this.storage.setKey('user', JSON.stringify(result.value.user));
      this.storage.setKey('token', token).then(() => {
        this.navLogin(); //change observable to show navbar after set for token
      });
      this.router.navigate(['home']);
    }).add(() =>{this.global.endNativeLoad()});
  }

  async logout() {
    this.storage.deleteKey('token').then(() => {
      this.navLogout();
      this.router.navigate(['login']); //route user back to login
    })
   }

}
