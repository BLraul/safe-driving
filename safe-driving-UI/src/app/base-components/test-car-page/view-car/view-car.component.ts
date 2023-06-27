import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCarDetailsById, getSelectedCarDetails } from 'src/app/store/actions/car-test/car-test.action';
import {  selectCarDetailsById } from 'src/app/store/selectors/car-test/car-test.selectors';
import { Product } from 'src/app/useful/product';
import { DeleteTestCarComponent } from '../delete-test-car/delete-test-car.component';
import { ProgramingTestCarComponent } from '../programing-test-car/programing-test-car.component';
import { UpdateTestCarComponent } from '../update-test-car/update-test-car.component';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.scss']
})
export class ViewCarComponent implements OnInit {
  carId = 0;
  carDetailById$: Observable<Product>;
  constructor(private store: Store, public dialog: MatDialog, private router: Router) {

  }
    
    ngOnInit(): void {
      this.carId = Number(this.router.url.split('/').pop());
      this.store.dispatch(getCarDetailsById({carId:this.carId}))
      this.carDetailById$ = this.store.select(selectCarDetailsById);
      this.carDetailById$.subscribe(d=>console.log("carDetailById data ", d));
    }

  openDialog(car: Product, mode: string): void {
    if (mode === 'delete') {
      this.store.dispatch(getSelectedCarDetails({car: car}));
      this.dialog.open(DeleteTestCarComponent, {
        width: '500px',
      });
    }
    if (mode === 'edit') {
      this.carId = car.id;
      this.store.dispatch(getCarDetailsById({carId: car.id}));
      this.dialog.open(UpdateTestCarComponent, {
        width: '1000px',
      });
    }
    if (mode === 'programing') {
      this.dialog.open(ProgramingTestCarComponent, {
        width: '1200px',
      });
    }
  }

}
