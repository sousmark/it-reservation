import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../../../services/notification.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { NotificationTypes } from '../../../models/enums/notificationTypes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  applicationName: string;
  authenticationMethod: string;
  showOtpPasswordSection: boolean = false;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {
    this.applicationName = environment.applicationName;
    this.authenticationMethod = environment.authenticationMethod;
    this.isLoading$ = this.authService.isLoading$;
    this.showOtpPasswordSection = false;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      ipn: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
      username: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
      phoneNumber: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
      identifier: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
      otpPassword: [
        null,
        Validators.compose([
          Validators.required
        ]),
      ],
    });
  }

  async submit() {
    let result = false;
    if (this.authenticationMethod == 'LDAP') {
      result = await this.authenticationService.login(this.f.ipn.value, this.f.password.value);
    }
    else if (this.authenticationMethod == 'CUSTOM') {
      // result = this.authenticationService.login(this.f.username.value, this.f.password.value)
    }
    else if (this.authenticationMethod == 'OTP') {
      if (!this.showOtpPasswordSection) {
        const otpResult = this.authenticationService.sendOtpPassword(this.f.identifier.value, this.f.phoneNumber.value);
        if (!otpResult) {
          this.notificationService.notify(NotificationTypes.FAILURE,'AUTH.LOGIN_FAILED');
        }
      }
      else {
        result = this.authenticationService.checkOtpPassword(this.f.otpPassword.value);
      }
    }
    else if (this.authenticationMethod == 'IDP') {
      // result = this.authenticationService.login(null, null);
    }


    if (result) {
      this.router.navigate([this.returnUrl]);
    }
    else {
      if (this.authenticationMethod != 'OTP') {
        this.notificationService.notify(NotificationTypes.FAILURE,'AUTH.LOGIN_FAILED');
      }
      else {
        if (!this.showOtpPasswordSection) {
          this.showOtpPasswordSection = true;
        }
        else {
          this.notificationService.notify(NotificationTypes.FAILURE, 'AUTH.LOGIN_FAILED');
        }
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
