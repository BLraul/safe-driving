import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError, tap, concatMap } from "rxjs/operators";
import * as ProductActions from "../../actions/car-test/car-test.action";
import { CarTestService } from "src/app/services/car-test/car-test.service";

@Injectable()
export class CarTestEffects {
  constructor(
    private actions$: Actions,
    private carTestService: CarTestService
  ) { }



  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadCarsTest),
    mergeMap(() => {
      return this.carTestService.getTestCars().pipe(
        map((carsTest) =>
          ProductActions.loadCarsTestSuccess({ carsTest: carsTest })
        ),
        catchError((error) => {
          return [
            ProductActions.loadCarsTestFailure({
              error: error,
            }),
          ];
        })
      )
    })
  )
  );


  loadProductsById$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.getCarDetailsById),
    mergeMap(({ carId }) => {
      return this.carTestService.getTestCarsById(carId).pipe(
        map((car) =>
          ProductActions.getCarDetailsByIdSuccess({ car: car })
        ),
        catchError((error) => {
          return [
            ProductActions.loadCarsTestFailure({
              error: error,
            }),
          ];
        })
      )
    })
  )
  );
  loadProductsByCategory$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.searchCategoryProducts),
    mergeMap(({ categoryId }) => {
      return this.carTestService.getTestCarsByCategory(categoryId).pipe(
        map((cars) =>
          ProductActions.searchCategoryProductsSuccess({ cars })
        ),
        catchError((error) => {
          return [
            ProductActions.searchCategoryProductsFailure({
              error: error,
            }),
          ];
        })
      )
    })
  )
  );

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.addCarTest),
    tap((product) => console.log(product)),
    concatMap(({ product }) =>
      this.carTestService.addProduct(product).pipe(
        map((newProduct) => ProductActions.addCarTestSuccess(newProduct)),
        catchError(() => EMPTY)
      )
    )
  )
  );

  updateCarTest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateSelectedCarDetails),
      concatMap(({ carDetails }) => {
        return this.carTestService
          .updateCarTest(carDetails)
          .pipe(
            map(() =>
              ProductActions.updateSelectedCarDetailsSuccess({ carDetails }),
            ),
            catchError((error) => {
              return [
                ProductActions.updateSelectedCarDetailsFailure({
                  error: error,
                }),
              ];
            })
          );
      })
    )
  );


  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.removeCarTest),
    mergeMap(({ id }) =>
      this.carTestService.deleteProduct(id).pipe(
        map((id) => ProductActions.removeCarTestSuccess(id)),
        catchError(() => EMPTY)
      )
    )
  )
  );


  loadCategory$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadCategorys),
    mergeMap(() => {
      return this.carTestService.getCategorys().pipe(
        map((categorys) =>
          ProductActions.loadCategorysSuccess({ categorys: categorys })
        ),
        catchError((error) => {
          return [
            ProductActions.loadCategorysFailure({
              error: error,
            }),
          ];
        })
      )
    })
  )
  );


  addPrograming$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.addProgramingCarTest),
    tap((programing) => console.log(programing)),
    concatMap(({ programing }) =>
      this.carTestService.addPrograming(programing).pipe(
        map((programingAdded) => ProductActions.addProgramingCarTestSuccess(programingAdded)),
        catchError(() => EMPTY)
      )
    )
  )
  );

  sendEmail$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.sendEmail),
    tap((sendEmail) => console.log("sendEmail", sendEmail)),
    concatMap(({ emailMessage }) =>
      this.carTestService.sendEmail(emailMessage).pipe(
        map((emailMessageSent) => ProductActions.sendEmailSuccess(emailMessageSent)),
        catchError(() => EMPTY)
      )
    )
  )
  );

  deleteAppointment$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.removeAppointment),
    mergeMap(({ id }) =>
      this.carTestService.deleteAppointment(id).pipe(
        map((id) => ProductActions.removeAppointmentSuccess(id)),
        catchError(() => EMPTY)
      )
    )
  )
  );

}
