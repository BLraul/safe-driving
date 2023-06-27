import { Component } from '@angular/core';

@Component({
  selector: 'app-email-notification-sent',
  templateUrl: './email-notification-sent.component.html',
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
export class EmailNotificationSentComponent {

}
