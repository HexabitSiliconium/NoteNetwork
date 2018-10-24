import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  //Exposes LoginService and Router modules
  constructor(private loginServ: LoginService, private router: Router) { }
  //Method which checks if user is logged in
  canActivate() {
    if (!this.loginServ.isLoggedIn()) {
      //If note logged in, redirects to home page
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
