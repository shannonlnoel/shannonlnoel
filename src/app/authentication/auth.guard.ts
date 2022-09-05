//import {  } from '.././Services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../services/storage/store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router,// private service: AppUserService
  private store: StoreService
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // if (this.store.getKey('token') != null) {
    //   // const roles = next.data.permittedRoles as Array<string>;
    //   // if (roles) {
    //   //   // if (this.service.roleMatch(roles)) { return true; } else {
    //   //   //   this.router.navigate(['/forbidden']);
    //   //   //   return false;
    //   //   // }
    //   // }
    //   // return true;
    //   return true;
    // } else {
    //   // this.router.navigate(['/pages/login']);
    //   return false;
    // }
      return true;
  }
}