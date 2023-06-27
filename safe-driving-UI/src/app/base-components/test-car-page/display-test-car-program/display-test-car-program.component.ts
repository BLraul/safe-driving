import {  Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EmailService } from 'src/app/services/email/email.service';
import { getCarDetailsById, removeAppointment, sendEmail } from 'src/app/store/actions/car-test/car-test.action';
import { selectCarDetailsById } from 'src/app/store/selectors/car-test/car-test.selectors';
import { EmailMessage } from 'src/app/useful/email-message';
import { Product } from 'src/app/useful/product';
import { Programing } from '../../../useful/programing-model';
import { EmailNotificationSentComponent } from '../notifications/email-notification-sent/email-notification-sent.component';
import { NotificationDeleteAppointmentComponent } from '../notifications/notification-delete-appointment/notification-delete-appointment.component';

@Component({
  selector: 'app-display-test-car-program',
  templateUrl: './display-test-car-program.component.html',
  styleUrls: ['./display-test-car-program.component.scss']
})


export class DisplayTestCarProgramComponent implements OnChanges {
  
  @Input() ELEMENT_DATA: Programing[] 
 
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age','city', 'phone', 'email', 'data' , 'actions'];
  dataToDisplay :Programing[];
  selectedProduct$: Observable<Product> = this.store.select(selectCarDetailsById);
  dataSource:any ;
  productId = 0;

  constructor(private store: Store, private emailServices: EmailService,  private _snackBar: MatSnackBar,  private router: Router) { }


  ngOnChanges(changes: SimpleChanges){
    console.log("changes",changes)
    const ELEMENT_DATA_Value = changes['ELEMENT_DATA']
    if(!!ELEMENT_DATA_Value.currentValue){
      this.dataSource = this.ELEMENT_DATA;
    }else{
      console.log("S-a ajuns pe else");
      this.dataSource =[]
    }
  }

  sendEmail( programing:Programing){
    let carName: string;
    this.selectedProduct$.subscribe((data)=> carName = data.productName)
    const emailMessage : EmailMessage = {
      to: programing.email,
      subject: "Programming the car " + carName + " for a test drive",
      message: "Hello " + programing.firstName + " " + programing.lastName + " esti programat pentru data de: " + programing.data + " la un test drive cu masina: " + carName
    };
 this.store.dispatch(sendEmail(emailMessage));
 this.openSnackBar("send-email");
  }





  deleteAppointment(appointment:Programing){
    console.log("Delete programing ", appointment.id);

    this.store.dispatch(removeAppointment(appointment.id));
    this.openSnackBar("delete-appointment");
    this.productId = Number(this.router.url.split('/').pop());
    this.store.dispatch(getCarDetailsById({carId:this.productId}));
  }

  openSnackBar(action: string) {
    if(action === "delete-appointment"){
      const durationInSeconds = 3;
      const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
      this._snackBar.openFromComponent(NotificationDeleteAppointmentComponent, {
        duration: durationInSeconds * 1000,
        horizontalPosition: horizontalPosition,
        panelClass: ['snackbar-delete']
      });
    }else if(action === "send-email"){
      const durationInSeconds = 3;
      const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
      this._snackBar.openFromComponent(EmailNotificationSentComponent, {
        duration: durationInSeconds * 1000,
        horizontalPosition: horizontalPosition,
        panelClass: 'snackbar-create'
      });
    }
    
  }
  
  
}

