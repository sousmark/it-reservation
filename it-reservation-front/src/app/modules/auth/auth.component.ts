import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  today: Date = new Date();
  applicationName: string;
  constructor() {
    this.applicationName = environment.applicationName;
   }

  ngOnInit(): void {
  }

}
