import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-create-appointment',
  templateUrl: './notification-create-appointment.component.html',
  styles: [
    `
  :host{
    display: flex;
    justify-content: center;
    font-family: sans-serif;
  }
  .matSnackBarLabel {
    color: #fff;
  }
  .matSnackBarActions{
    margin-left: 150px;
  }
  .icon-addCarSuccess{
    color: #fff;
  }
  `,
  ],
})
export class NotificationCreateAppointmentComponent {

}
