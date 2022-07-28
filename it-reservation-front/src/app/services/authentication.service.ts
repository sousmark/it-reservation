import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BackendResponse } from "../models/backendResponse";
import { NotificationTypes } from "../models/enums/notificationTypes";
import { NotificationService } from "./notification.service";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;
  currentUser$: Observable<any>;
  currentUserSubject: BehaviorSubject<any>;
  authLocalStorageToken = `${environment.applicationCode}.${environment.appVersion}.TOKEN`;
  constructor(private router: Router, private httpClient: HttpClient, private notificationService: NotificationService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  getCurrentUserValue(): any {
    return JSON.parse(localStorage.getItem("auth"));
  }

  set currentUserValue(user: any) {
    this.currentUserSubject.next(user);
  }
  login(username: string, password: string) {
    this.isLoadingSubject.next(true);
    switch (environment.authenticationMethod) {
      case "LDAP":
        this.isLoadingSubject.next(false);
        return this.loginLdap(username, password);
      case "CUSTOM":
        this.isLoadingSubject.next(false);
        return this.loginCustom(username, password);
      case "IDP":
        this.isLoadingSubject.next(false);
        return this.loginIdp();
      case "OTP":
        this.isLoadingSubject.next(false);
        return this.sendOtpPassword(username, password);
      default:
        this.isLoadingSubject.next(false);
        return false;
    }
  }

  async loginLdap(ipn: string, password: string) {    
    if (ipn == "test" || !ipn || !password) {
      return false;
    }

    try {
      let promise = this.httpClient
        .post<BackendResponse>(`http://localhost:3000/api/login`, {
          ipn: ipn,
          password: password,
        })
        .toPromise();
      let response = await Promise.resolve(promise);

      if (response.success) {
        this.notificationService.notify(NotificationTypes.SUCCESS, "Login Success");
        localStorage.setItem(this.authLocalStorageToken, response.data.token);
        localStorage.setItem("auth", JSON.stringify(response.data.user));
        this.currentUserSubject.next(response.data.user);
        this.currentUserValue = response.data.user;
        return true;
      }
    } catch (error) {
      this.notificationService.notify(NotificationTypes.FAILURE, error.message);
    }

    return false;
  }

  getUser() {
    const token = localStorage.getItem(this.authLocalStorageToken);
    if (!token) return null;

    const user = {
      username: "uname",
      Name: "Test",
      Surname: "User",
    };

    this.currentUserSubject = new BehaviorSubject<any>(user);

    return user;
  }

  loginCustom(username: string, password: string) {
    if (username == "test" || !username || !password) {
      return false;
    }

    localStorage.setItem(this.authLocalStorageToken, "TESTTOKEN");
    this.currentUserSubject.next({
      username: "uname",
      Name: "Test",
      Surname: "User",
    });

    return true;
  }

  loginIdp() {
    localStorage.setItem(this.authLocalStorageToken, "TESTTOKEN");
    this.currentUserSubject.next({
      username: "uname",
      Name: "Test",
      Surname: "User",
    });
    return true;
  }

  sendOtpPassword(username: string, phoneNumber: string) {
    return true;
  }

  checkOtpPassword(password: string) {
    if (password == "12345") {
      localStorage.setItem(this.authLocalStorageToken, "TESTTOKEN");
      this.currentUserSubject.next({
        username: "uname",
        Name: "Test",
        Surname: "User",
      });
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    localStorage.removeItem("auth");
    this.router.navigate(["/auth/login"], {
      queryParams: {},
    });
  }
}
