import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API = "http://localhost:8080";

  requestHeader = new HttpHeaders();
  constructor(  private httpclient: HttpClient,
    private userAuthService: UserAuthService,    
    private router: Router)
     { }

  public login(loginData) {
    return this.httpclient.post(this.PATH_OF_API + "/authenticate", loginData, {
      headers: this.requestHeader,
      }).subscribe((response: any)=>{
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setUserData(response.user);
        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/home-page']);
        } else {
          this.router.navigate(['/user-page']);
        }
      },
      (error) =>{
        console.log(error);
      });
  }
  public signUp(signUpData) {
    return this.httpclient.post(this.PATH_OF_API + "/registerNewUser", signUpData, {
      headers: this.requestHeader,
      }).subscribe((response: any)=>{},
      (error) =>{console.log(error);});
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
