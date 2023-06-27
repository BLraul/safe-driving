import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addCarTest } from 'src/app/store/actions/car-test/car-test.action';
import { CarAdditionNotificationComponent } from '../notifications/car-addition-notification/car-addition-notification.component';


@Component({
  selector: 'app-create-test-car',
  templateUrl: './create-test-car.component.html',
  styleUrls: ['./create-test-car.component.scss']
})
export class CreateTestCarComponent {
 
  constructor(
    private store: Store, private router:Router, private _snackBar: MatSnackBar ) { }

  addNewProduct(addForm: NgForm) {
    this.store.dispatch(addCarTest(addForm.value));
    this.openSnackBar();
    this.router.navigate(['products']);
  }

  openSnackBar() {
    const durationInSeconds = 3;
    const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    this._snackBar.openFromComponent(CarAdditionNotificationComponent, {
      duration: durationInSeconds * 1000,
      horizontalPosition: horizontalPosition,
      panelClass: ['snackbar-add']
    });
  }
}
