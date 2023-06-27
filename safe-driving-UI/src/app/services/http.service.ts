import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class HttpService extends HttpClient {
  private readonly httpOptions;
  private static errHandler(errorResp: HttpErrorResponse): Observable<any> {
    if (!errorResp) {
        return;
    }
    return throwError(errorResp);
}
constructor(handler: HttpHandler) {
  super(handler);
}

public getAboutData(
  url: string,
  options?: any,
  specificUrl = false,
  withCredentials = true
): Observable<any> {
  const fullUrl = specificUrl ? url : this.getUrlAbout(url);
  const response = super
      .get<HttpResponse<any>>(fullUrl, { ...options, withCredentials })
      .pipe(
          map((res: HttpEvent<HttpResponse<any>>) => {
              return res;
          }),
          catchError((err) => {
              return HttpService.errHandler(err);
          })
      );
  return response;
}
public getAccidentCases(
  url: string,
  options?: any,
  specificUrl = false,
  withCredentials = true
): Observable<any> {
  const fullUrl = specificUrl ? url : this.getUrlAccident(url);
  const response = super
      .get<HttpResponse<any>>(fullUrl, { ...options, withCredentials })
      .pipe(
          map((res: HttpEvent<HttpResponse<any>>) => {
              return res;
          }),
          catchError((err) => {
              return HttpService.errHandler(err);
          })
      );
  return response;
}
public override get(
  url: string,
  options?: any,
  specificUrl = false,
  withCredentials = true
): Observable<any> {
  const fullUrl = specificUrl ? url : this.getFullUrl(url);
  const response = super
      .get<HttpResponse<any>>(fullUrl, { ...options, withCredentials })
      .pipe(
          map((res: HttpEvent<HttpResponse<any>>) => {
              return res;
          }),
          catchError((err) => {
              return HttpService.errHandler(err);
          })
      );
  return response;
}

public override put(
  url: string,
  body: any | null,
  options?: any,
  withCredentials = true,
  specificUrl = false
): Observable<any> {
  const fullUrl = specificUrl ? url : this.getFullUrl(url);
  const obs = !!environment.useMockData
      ? super.get(fullUrl)
      : super.put(fullUrl, body, { ...options, withCredentials });
  return obs;
}


public override post(
  url: string,
  body: any | null,
  options?: any,
  withCredentials = true,
  specificUrl = false
): Observable<any> {
  const fullUrl = specificUrl ? url : this.getFullUrl(url);
  const obs = !!environment.useMockData
      ? super.get(fullUrl)
      : super.post(fullUrl, body, { ...options, withCredentials });
  return obs;
}

public override delete(
  url: string,
  options?: any,
  specificURL = false,
  withCredentials = true
): Observable<any> {
  const fullUrl = specificURL ? url : this.getFullUrl(url);
  let isRequestCanceled = true;
  const response = super
    .delete<HttpResponse<any>>(fullUrl, { ...options, withCredentials })
    .pipe(
      map((res: HttpResponse<any>) => {
        isRequestCanceled = false;
        return res;
      }),
      catchError((err) => {
        isRequestCanceled = false;
        return HttpService.errHandler(err);
      }),
    );
  return response;
}


private getFullUrl = (url: string): string => {
  if (environment.useMockData) {
      return `mocks/${url}.json`;
  }
  return `${environment.backendURL}/${url}`;
};
private getUrlAbout = (url: string): string => {
      return `mocks/${url}.json`;
  };
private getUrlAccident = (url: string): string => {
      return `mocks/${url}.json`;
  };
}
