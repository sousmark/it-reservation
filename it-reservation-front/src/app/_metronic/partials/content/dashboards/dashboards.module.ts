import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { DashboardWrapperComponent } from './dashboard-wrapper/dashboard-wrapper.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { VerifyModule } from 'src/app/modules/verify/verify.module';
import { VerifyComponent } from 'src/app/modules/verify/verify.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [Dashboard1Component, Dashboard2Component, DashboardWrapperComponent, Dashboard3Component],
  imports: [CommonModule, WidgetsModule, TranslateModule, VerifyModule, MatDialogModule],
  exports: [DashboardWrapperComponent],
  entryComponents: [VerifyComponent]
})
export class DashboardsModule { }
