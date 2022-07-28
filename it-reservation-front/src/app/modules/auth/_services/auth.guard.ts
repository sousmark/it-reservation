import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { environment } from "../../../../environments/environment";
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  authLocalStorageToken: string;
  constructor(private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authLocalStorageToken = `${environment.applicationCode}.${environment.appVersion}.TOKEN`;
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return true;
    }

    else {
      if (localStorage.getItem(this.authLocalStorageToken)) {

        this.authService.currentUserSubject.next({
          username: 'uname',
          name: 'Test',
          surname: 'User'
        });
    
        return true; 
      }
    }

    this.authService.logout();
    return false;
  }
}
