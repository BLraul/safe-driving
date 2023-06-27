import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCarDetails, selectCarName } from 'src/app/store/selectors/car-test/car-test.selectors';
import { Product } from 'src/app/useful/product';

@Component({
  selector: 'app-car-deletion-notification',
  templateUrl: './car-deletion-notification.component.html',
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
export class CarDeletionNotificationComponent {
  
  deleteCarName$: Observable<string> = this.store.select(selectCarName) ;
  constructor(private store: Store ) { }
}
