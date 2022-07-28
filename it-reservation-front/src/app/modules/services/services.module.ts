import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '../i18n/translation.module';
import { ServicesComponent } from './services.component';
import { ServicesRoutingModule } from './services-routing.module';
import { ListServicesComponent, NgbdModalContent } from './list-services/list-services.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ServicesComponent,
    ListServicesComponent,
    NgbdModalContent,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    TranslationModule,
    ReactiveFormsModule,
  ]
})
export class ServicesModule { }