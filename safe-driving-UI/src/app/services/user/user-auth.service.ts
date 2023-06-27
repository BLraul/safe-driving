import { Injectable } from '@angular/core';
import { UserData } from '../../useful/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor() { }
  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }
  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles'));
  }
  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }
  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }
  public setUserData(userData: UserData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  public getUserData(): UserData {
    return JSON.parse(localStorage.getItem('userData'));
  } 
  public clear() {
    localStorage.clear();
  }
  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
