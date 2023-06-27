import { Component } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addProgramingCarTest, getCarDetailsById, loadTestCarProgramingsByCarId } from 'src/app/store/actions/car-test/car-test.action';
import { selectCarDetailsById } from 'src/app/store/selectors/car-test/car-test.selectors';
import { Product } from 'src/app/useful/product';
import { Programing } from '../../../useful/programing-model';
import { NotificationCreateAppointmentComponent } from '../notifications/notification-create-appointment/notification-create-appointment.component';

@Component({
  selector: 'app-programing-test-car',
  templateUrl: './programing-test-car.component.html',
  styleUrls: ['./programing-test-car.component.scss']
})
export class ProgramingTestCarComponent {
 
  selectedProduct$: Observable<Product> = this.store.select(selectCarDetailsById);
  panelOpenState:boolean = false ;
  step = 0;
  email:FormControl = new FormControl('', [Validators.required, Validators.email]);
  minDate = new Date(Date.now())
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 ;
  };

  programingTest: Programing;
  testCar: Product;
  
  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<ProgramingTestCarComponent>,
    private router: Router,
    private _snackBar: MatSnackBar ){
      this.selectedProduct$.subscribe(data=> {if (!!data) this.testCar = data});
    }

    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'You must enter a value';
      }
  
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
    setStep(index: number) {
      this.step = index;
    }
  
    nextStep() {
      this.step++;
    }
  
    prevStep() {
      this.step--;
    }

    addTestPrograming(programingForm: NgForm){
      this.programingTest = programingForm.value;
      console.log("adding programingTest", this.programingTest)
      this.programingTest.data = programingForm.value.data.toLocaleDateString();
      this.programingTest.testCar = this.testCar;   
      this.store.dispatch(addProgramingCarTest(this.programingTest));
      let productId = Number(this.router.url.split('/').pop());
      this.store.dispatch(getCarDetailsById({carId: productId}))
      this.dialogRef.close();
      this.openSnackBar();
    }

    openSnackBar() {
      const durationInSeconds = 3;
      const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
      this._snackBar.openFromComponent(NotificationCreateAppointmentComponent, {
        duration: durationInSeconds * 1000,
        horizontalPosition: horizontalPosition,
        panelClass: 'snackbar-create'
      });
    }

}
