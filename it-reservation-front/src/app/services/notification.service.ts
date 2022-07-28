import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { environment } from "../../environments/environment";
import { NotificationTypes } from '../models/enums/notificationTypes';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(private snackBar: MatSnackBar,
    private translate: TranslateService) { }

  notify(notificationType: NotificationTypes, message: string, raw: boolean = false) {
    let cssClass = ['notification-standard'];
    if(notificationType == NotificationTypes.SUCCESS) {
      cssClass = ['notification-success'];
    }
    else if (notificationType == NotificationTypes.FAILURE) {
      cssClass = ['notification-failure'];
    }
    else if (notificationType == NotificationTypes.WARNING) {
      cssClass = ['notification-warning'];
    }
    else if (notificationType == NotificationTypes.INFO) {
      cssClass = ['notification-info'];
    }
    
    let notification = raw ? message : this.translate.instant(message);
    this.snackBar.open(notification, null, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: environment.snackbarDuration,
      panelClass: cssClass
    })
  }
}