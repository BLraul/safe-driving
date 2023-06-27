import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user/user-auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userAuthService.getToken() !== null) {
        const roles = route.data['roles'] as Array<string>;
        if (roles) {
          const match = this.userService.roleMatch(roles);
          if (match) {
            return true;
          } else {
            this.router.navigate(['/forbidden-page']);
            return false;
          }
        }
      }
      this.router.navigate(['/login-page']);
      return false;
  }
  
}
