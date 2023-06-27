import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../../useful/product';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { getCarDetailsById, loadCarsTest, loadTestCarProgramingsByCarId } from 'src/app/store/actions/car-test/car-test.action';
import { selectAllCarsTest } from 'src/app/store/selectors/car-test/car-test.selectors';

import { Router } from '@angular/router';


@Component({
  selector: 'app-view-all-cars',
  templateUrl: './view-all-cars.component.html',
  styleUrls: ['./view-all-cars.component.scss']
})
export class ViewAllCarsComponent {

  carsList$: Observable<Product[]> = this.store.select(selectAllCarsTest);
  carsListFilter$: Subject<Product[]> = new BehaviorSubject(null);

  constructor(private store: Store, public dialog: MatDialog,  private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(loadCarsTest());
    this.store.select(selectAllCarsTest).subscribe(data => this.carsListFilter$.next(data));
  }

  navigateToTheCar(carId: number){
    this.store.dispatch(getCarDetailsById({carId: carId}));
    this.router.navigate(['product', carId]);
  }

  public searchCarTest(key: string): void {
    const results: Product[] = [];
    this.carsList$.subscribe((data)=> data.forEach(item =>{
      if(item.productName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(item);
      }
    }))
        this.carsListFilter$.next(results)
  }
  
}
