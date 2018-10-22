import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private loginServ: LoginService, private router: Router) { }

  canActivate() {
    if (!this.loginServ.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
