import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectNewProductName } from 'src/app/store/selectors/car-test/car-test.selectors';

@Component({
  selector: 'car-addition-notification',
  templateUrl: './car-addition-notification.component.html',
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
export class CarAdditionNotificationComponent {
carName$: Observable<string> = this.store.select(selectNewProductName) ;

constructor(private store: Store ) { }
  

}
