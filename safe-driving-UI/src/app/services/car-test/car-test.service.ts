import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError as observableThrowError, throwError, } from 'rxjs';
import { Category } from 'src/app/base-components/test-car-page/test-car-page-framework/test-car-page-sidebar/category';
import { EmailMessage } from 'src/app/useful/email-message';
import { invalidStructureMsg } from 'src/app/useful/generic-texts';
import { IServiceError } from 'src/app/useful/interfaces';

import { Product } from 'src/app/useful/product';
import { Programing } from 'src/app/useful/programing-model';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class CarTestService {

  constructor(private httpService: HttpService) { }

  getTestCars(): Observable<Product[]> {
    const url: string = 'testcar/all';
    return this.httpService.get(url)
      .pipe(
        map((resp) => resp),
        catchError(this.errorHandler)
      );
  }
  getTestCarsById(id: number): Observable<Product> {
    const url: string = `testcar/find/${id}`;
    return this.httpService.get(url)
      .pipe(
        map((resp) => resp),
        catchError(this.errorHandler)
      );
  }
  getTestCarsByCategory(categoryId: number): Observable<Product[]> {
    const url: string = `testcar/findCategory/${categoryId}`;
    return this.httpService.get(url)
      .pipe(
        map((resp) => resp),
        catchError(this.errorHandler)
      );
  }

  addProduct(product: Product): Observable<Product> {
    const url: string = 'testcar/add';
    return this.httpService.post(url, product).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  updateCarTest(body: Product): Observable<any> {
    const url: string = 'testcar/update';
    return this.httpService.put(url, body).pipe(
      map((resp: Product) =>
        !!resp ? resp : throwError(invalidStructureMsg)
      ),
      catchError((err: IServiceError) => throwError(err))
    );
  }

  deleteProduct(id: number): Observable<any> {
    const url: string = `testcar/delete/${id}`;
    return this.httpService.delete(url).pipe(
      map((resp) =>
        !!resp ? resp : throwError(invalidStructureMsg)
      ),
      catchError((err: IServiceError) => throwError(err))
    );
  }
  deleteAppointment(id: number): Observable<any> {
    const url: string = `programing/delete/${id}`;
    return this.httpService.delete(url).pipe(
      map((resp) =>
        !!resp ? resp : throwError(invalidStructureMsg)
      ),
      catchError((err: IServiceError) => throwError(err))
    );
  }

  getCategorys(): Observable<Category[]> {
    const url: string = 'category/all';
    return this.httpService.get(url)
      .pipe(
        map((resp) => resp),
        catchError(this.errorHandler)
      );
  }


  addPrograming(programing: Programing): Observable<Programing> {
    const url: string = 'programing/add';
    return this.httpService.post(url, programing).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  getProgramings(): Observable<Programing[]> {
    const url: string = 'programing/all';
    return this.httpService.get(url)
      .pipe(
        map((resp) => resp),
        catchError(this.errorHandler)
      );
  }

  sendEmail(emailMessage: EmailMessage): Observable<EmailMessage> {
    const url: string = 'email/send-email';
    return this.httpService.post(url, emailMessage).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }

}
