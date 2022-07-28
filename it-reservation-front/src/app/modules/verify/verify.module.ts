import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyComponent } from './verify.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [VerifyComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class VerifyModule { } 
  