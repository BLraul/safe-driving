import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserAuthService } from 'src/app/services/user/user-auth.service';
import { userDetails, userRoles } from 'src/app/store/selectors/user/user.selectors';
import { environment } from 'src/environments/environment';
import { UserData } from '../../useful/interfaces';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  isMenuOpened: boolean = false;
  userData: UserData;
  userRoles: any[] = [];
  userData$: Observable<UserData> = this.store.select(userDetails);
  userRoles$: Observable<string[]> = this.store.select(userRoles);

  constructor(private store: Store,
    private userAuthService: UserAuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (environment.useMockData === true) {
      this.userData$.subscribe((data) => {
        this.userData = data;
      });
      this.userRoles$.subscribe((data) => {
        this.userRoles = data;
      });
    } else {
      this.userData = this.userAuthService.getUserData();
      this.userRoles.push(this.userData.role[0].roleName);
    }
  }

  toggleMenu(event: boolean) {
    this.isMenuOpened = event;
  }

  getInitials(userData: UserData) {
    const initials =
      userData.userFirstName.charAt(0) + userData.userLastName.charAt(0);
    return initials;
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login-page']);
  }
}
