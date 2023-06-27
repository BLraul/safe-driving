import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { removeCarTest } from 'src/app/store/actions/car-test/car-test.action';
// import {  removeCarTest } from 'src/app/store/actions/car-test/car-test.actions';
import {  selectCarDetails } from 'src/app/store/selectors/car-test/car-test.selectors';
import { Product } from 'src/app/useful/product';
import * as productActions from "../../../store/actions/car-test/car-test.action"
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { CarDeletionNotificationComponent } from '../notifications/car-deletion-notification/car-deletion-notification.component';

@Component({
  selector: 'app-delete-test-car',
  templateUrl: './delete-test-car.component.html',
  styleUrls: ['./delete-test-car.component.scss']
})
export class DeleteTestCarComponent {
  deleteProductId:number ;
  deleteCar$: Observable<any> = this.store.select(selectCarDetails); 
  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<DeleteTestCarComponent>,
    private router: Router,
    private _snackBar: MatSnackBar){}

  ngOnInit(): void {
     
  }

  public onDeleteCar(car: Product): void {
    this.store.dispatch(removeCarTest(car.id));
    this.openSnackBar();
    this.navigateToTheAllProducts()
    this.store.dispatch(
      productActions.loadCarsTest()
    );
  }

  openSnackBar() {
    const durationInSeconds = 3;
    const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    this._snackBar.openFromComponent(CarDeletionNotificationComponent, {
      duration: durationInSeconds * 1000,
      horizontalPosition: horizontalPosition,
      panelClass: ['snackbar-delete']
    });
  }
  
  navigateToTheAllProducts(){
    this.router.navigate(['products']);
  }
}
