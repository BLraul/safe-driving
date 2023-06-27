import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { EmailMessage } from 'src/app/useful/email-message';
import { HttpService } from '../http.service';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpService: HttpService) { }

  sendEmail(emailMessage: EmailMessage): Observable<EmailMessage> {
    const url: string = 'email/send-email';
    return this.httpService.post(url, emailMessage).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}
