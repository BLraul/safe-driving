import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCarNameById } from 'src/app/store/selectors/car-test/car-test.selectors';

@Component({
  selector: 'app-car-update-notification',
  templateUrl: './car-update-notification.component.html',
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
export class CarUpdateNotificationComponent {
  selectedProductForUpdate$: Observable<string> = this.store.select(selectCarNameById); 

  constructor(private store: Store ) { }
}
