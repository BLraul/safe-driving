import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/services/user/user-auth.service';
import { UserData } from 'src/app/useful/interfaces';

@Component({
  selector: 'app-user-restrictions-page',
  templateUrl: './user-restrictions-page.component.html',
  styleUrls: ['./user-restrictions-page.component.scss']
})
export class UserRestrictionsPageComponent {
  userData: UserData = this.userAuthService.getUserData();
  userName: string;
  userRoleDescription: string;

  constructor(private userAuthService:UserAuthService) { }

  ngOnInit(): void {
      if(!!this.userData){
        this.userName = this.userData.userFirstName + " " +this.userData.userLastName;
        this.userRoleDescription = this.userData.role[0].roleDescription;
      }else{
        this.userName = "User";
        this.userRoleDescription = "No Roles Description"
      }
}
}
