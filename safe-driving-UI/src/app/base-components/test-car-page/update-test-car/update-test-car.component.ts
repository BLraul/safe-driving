import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import {  Observable, } from 'rxjs';
import { getCarDetailsById, updateSelectedCarDetails } from 'src/app/store/actions/car-test/car-test.action';
import { selectCarDetailsById } from 'src/app/store/selectors/car-test/car-test.selectors';
import { Product } from 'src/app/useful/product';
import { CarUpdateNotificationComponent } from '../notifications/car-update-notification/car-update-notification.component';

@Component({
  selector: 'app-update-test-car',
  templateUrl: './update-test-car.component.html',
  styleUrls: ['./update-test-car.component.scss']
})
export class UpdateTestCarComponent implements OnInit {

  editProductDetails: Product = {};
  selectedProduct$: Observable<Product> = this.store.select(selectCarDetailsById); 

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<UpdateTestCarComponent>, 
    private _snackBar: MatSnackBar,
    ){
    }

  ngOnInit(): void {

    this.selectedProduct$.subscribe(carData =>{
      this.editProductDetails = carData;
    });
  }

  updateProduct(product: Product){
    this.store.dispatch(
      updateSelectedCarDetails(product)
    );
    this.openSnackBar()

    this.dialogRef.close();

    // location.reload();
   
}

openSnackBar() {
  const durationInSeconds = 3;
  const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  this._snackBar.openFromComponent(CarUpdateNotificationComponent, {
    duration: durationInSeconds * 1000,
    horizontalPosition: horizontalPosition,
    panelClass: ['snackbar-update']
  });
}


}
