import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCategorys } from 'src/app/store/actions/car-test/car-test.action';
import { selectAllCategory } from 'src/app/store/selectors/car-test/car-test.selectors';
import { Category } from './category';

@Component({
  selector: 'app-test-car-page-sidebar',
  templateUrl: './test-car-page-sidebar.component.html',
  styleUrls: ['./test-car-page-sidebar.component.scss']
})
export class TestCarPageSidebarComponent {
  productList$: Observable<Category[]> = this.store.select(selectAllCategory);

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.store.dispatch(
      loadCategorys()
    );
  }

}
