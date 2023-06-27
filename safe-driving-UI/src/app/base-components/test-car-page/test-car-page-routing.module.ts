import { NgModule } from "@angular/core";
import { RouterModule} from "@angular/router";
import { CreateTestCarComponent } from "./create-test-car/create-test-car.component";
import { TestCarPageComponent } from "./test-car-page.component";
import { ViewAllCarsByCategoryComponent } from "./view-all-cars-by-category/view-all-cars-by-category.component";
import { ViewAllCarsComponent } from "./view-all-cars/view-all-cars.component";
import { ViewCarComponent } from "./view-car/view-car.component";

const routes = [
  {path:'',     component: TestCarPageComponent,
  children: [
        {path: '', component: ViewAllCarsComponent,},
        {path: 'products', component: ViewAllCarsComponent,},
        {path:'create-product', component: CreateTestCarComponent},
        { path: 'category/:id', component: ViewAllCarsByCategoryComponent },
        { path: 'product/:id', component: ViewCarComponent },
      ]},
];

  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TestCarPageRoutingModule { }
  