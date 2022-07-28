import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationTypes } from '../../../../../models/enums/notificationTypes';
import { VerifyComponent } from '../../../../../modules/verify/verify.component';
import { NotificationService } from '../../../../../services/notification.service';
import { LayoutService } from '../../../../core';

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
})
export class DashboardWrapperComponent implements OnInit {
  demo: string;
  NotificationTypes = NotificationTypes;
  notificationType: NotificationTypes;
  constructor(private layout: LayoutService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.demo = this.layout.getProp('demo');
  }

  notify(type: NotificationTypes) {
    this.notificationService.notify(type, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', true);
  }

  sampleVerifyModal(operation: string) {
    const dialogRef = this.dialog.open(VerifyComponent, {
      data: {
        operation
      }
    });


    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        this.notificationService.notify(NotificationTypes.FAILURE, 'Olumsuz', true);
        return;
      }

      this.notificationService.notify(NotificationTypes.SUCCESS, 'Olumlu', true);

    });
  }
}
