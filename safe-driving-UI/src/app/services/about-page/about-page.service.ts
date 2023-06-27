import { map, throwError as observableThrowError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ReleaseNote, VersionData } from 'src/app/useful/about-page-interfaces';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AboutPageService {

  private urlReleaseNotes: string = 'about/release';
  private urlBEVersion: string = 'about/version';

  constructor(private httpService: HttpService) {}

  getReleaseNotes(): Observable<ReleaseNote[]> {
      return this.httpService.getAboutData(this.urlReleaseNotes).pipe(
          map((releaseData) => {
              return releaseData;
          }),
          catchError(this.errorHandler)
      );
  }

  getBEVersion(): Observable<VersionData> {
      return this.httpService.getAboutData(this.urlBEVersion).pipe(
          map((data) => {
              return data;
          }),
          catchError(this.errorHandler)
      );
  }

  private errorHandler(error: HttpErrorResponse) {
      return observableThrowError(error.message || 'Server Error');
  }
  
}
