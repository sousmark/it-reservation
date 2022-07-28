import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { AppointmentComponent, NgbdModalContent } from './appointment/appointment.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TranslationModule } from '../i18n/translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CalendarComponent,
    AppointmentComponent,
    NgbdModalContent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class AppointmentModule { }