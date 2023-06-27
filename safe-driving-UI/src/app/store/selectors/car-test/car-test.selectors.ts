import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Category } from 'src/app/base-components/test-car-page/test-car-page-framework/test-car-page-sidebar/category';
import { Product} from 'src/app/useful/product';
import { Programing } from 'src/app/useful/programing-model';
import * as fromCarTestReducer from '../../reducers/car-test/car-test.reducers';

export const selectCar =
    createFeatureSelector<fromCarTestReducer.CarTestState>(
        fromCarTestReducer.carTestFeatureKey
    );

export const selectAllCarsTest = createSelector(
    selectCar,
    (state: fromCarTestReducer.CarTestState) =>
        state?.carsTestDetails
);

export const selectCarDetails = createSelector(
    selectCar,
    (state: fromCarTestReducer.CarTestState): Product =>
        (state.selectedCar)
);
export const selectCarName = createSelector(
    selectCar,
    (state: fromCarTestReducer.CarTestState): string =>
        (state.selectedCar?.productName)
);
export const selectCarNameById = createSelector(
    selectCar,
    (state: fromCarTestReducer.CarTestState): string =>
        (state.selectedCarById?.productName)
);
export const selectCarDetailsById = createSelector(
    selectCar,
    (state: fromCarTestReducer.CarTestState): Product =>
        (state.selectedCarById)
);
export const selectNewProductName = createSelector(
    selectCar,
    (state: fromCarTestReducer.CarTestState): string =>
        (state.newProduct?.productName)
);
export const selectCarDetailsByIdSuccess = createSelector(
    selectCar,
    (state: fromCarTestReducer.CarTestState): Product =>
        (state.updateProduct)
);
export const selectCarsDetailByCategoryId = createSelector(
    selectCar,
    (state: fromCarTestReducer.CarTestState): Product[] =>
        (state.carsTestByCategoryID)
);
export const selectAllCategory = createSelector(
    selectCar,
    (state: fromCarTestReducer.CarTestState): Category[] =>
        (state.categorys)
);
export const selectAllProgramings = createSelector(
    selectCar,
    (state: fromCarTestReducer.CarTestState): Programing[] =>
        (state.programings)
);


















// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { AccidentDetails } from 'src/app/useful/accident-details-interfaces';
// import { CaseMarker, CaseStatus } from 'src/app/useful/interfaces';
// import { Product, TestCarDetails } from 'src/app/useful/product';
// import * as fromCarTestReducer from '../../reducers/car-test/car-test.reducers';

// export const selectCar =
//     createFeatureSelector<fromCarTestReducer.CarTestState>(
//         fromCarTestReducer.carTestFeatureKey
//     );

// export const carsTestDetails = createSelector(
//     selectCar,
//     (state: fromCarTestReducer.CarTestState) =>
//         state.carsTestDetails
// );

// export const selectedCar = createSelector(
//     selectCar,
//     (state: fromCarTestReducer.CarTestState) =>
//         (state.selectedCar)
// );


// // export const currentCaseSelectionView = createSelector(
// //     selectCases,
// //     (state: fromCasesReducer.AccidentCasesState): CaseStatus =>
// //         state.currentCaseSelectionView
// // );