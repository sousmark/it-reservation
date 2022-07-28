import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../../core';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { AuthenticationService } from '../../../../../../services/authentication.service';
@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss'],
})
export class UserDropdownInnerComponent implements OnInit {
  extrasUserDropdownStyle: 'light' | 'dark' = 'light';
  user= null;

  constructor(private layout: LayoutService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.extrasUserDropdownStyle = this.layout.getProp(
      'extras.user.dropdown.style'
    );
    this.user = this.auth.getCurrentUserValue();    
  }

  logout() {
    this.auth.logout();
  }
}
