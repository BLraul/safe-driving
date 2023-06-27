import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { UserData } from '../../useful/interfaces';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersetingsService {

    private _url: string = 'users/settings';

  constructor(private httpService: HttpService) {}

  getUserSettings(): Observable<UserData> {
      return this.httpService.get(this._url).pipe(
          map((roles) => roles),
          catchError(this.errorHandler)
      );
  }

  private errorHandler(error: HttpErrorResponse) {
      return observableThrowError(error.message || 'Server Error');
  }

}
