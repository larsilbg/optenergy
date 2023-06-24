import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LoginService} from "./login.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    let data = this.loginService.isAuthenticated()
    if (data) {
      return true;
    } else {
      await this.router.navigate(['']);
      return false;
    }
  }
}

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    let data = this.loginService.isAuthenticated()
    if (data) {
      await this.router.navigate(['tabs']);
      return false;
    } else {
      return true;
    }
  }
}
