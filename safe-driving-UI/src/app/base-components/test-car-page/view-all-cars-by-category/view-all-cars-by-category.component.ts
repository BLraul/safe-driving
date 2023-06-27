import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCarDetailsById, searchCategoryProducts } from 'src/app/store/actions/car-test/car-test.action';
import { selectCarsDetailByCategoryId } from 'src/app/store/selectors/car-test/car-test.selectors';
import { Product } from 'src/app/useful/product';

@Component({
  selector: 'app-view-all-cars-by-category',
  templateUrl: './view-all-cars-by-category.component.html',
  styleUrls: ['./view-all-cars-by-category.component.scss']
})
export class ViewAllCarsByCategoryComponent implements OnInit {
  searchCategory:number = 0;
  productList:Product[] = [];
  productsListByCategoryId$: Observable<Product[]> = this.store.select(selectCarsDetailByCategoryId);
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data =>{
      this.searchCategory = data['id'];
      this.store.dispatch(
        searchCategoryProducts({
          categoryId: this.searchCategory
        })
        )
    });
  }

  navigateToTheProduct(productId: number){
    console.log("productID", productId)
    this.store.dispatch(
      getCarDetailsById({
        carId: productId,
      })
    )
    this.router.navigate(['product', productId]);
  }



}
