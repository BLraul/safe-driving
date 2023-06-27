import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../user/user-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userAuthService: UserAuthService,
    private router:Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.userAuthService.getToken();
    if (req.url.includes("/authenticate")) {
      return next.handle(req.clone());
    }
    req = this.addToken(req, token);

    return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse) => {
                console.log(err.status);
                if(err.status === 401) {
                    this.router.navigate(['/login-page']);
                } else if(err.status === 403) {
                    this.router.navigate(['/forbidden-page']);
                }
                return throwError(() => new Error("Something is wrong"));
            }
        )
    );
  }
  private addToken(request:HttpRequest<any>, token:string) {
    let headers = request.headers.set('Authorization', `Bearer ${token}` );
    return request.clone({headers});
}
}