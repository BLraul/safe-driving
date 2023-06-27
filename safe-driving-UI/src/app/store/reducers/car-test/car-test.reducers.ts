import { createReducer, on } from "@ngrx/store";
import { Category } from "src/app/base-components/test-car-page/test-car-page-framework/test-car-page-sidebar/category";
import { EmailMessage } from "src/app/useful/email-message";
import { Product } from "src/app/useful/product";
import { Programing } from "src/app/useful/programing-model";
import {  addCarTestSuccess, addProgramingCarTestSuccess, getCarDetailsByIdSuccess, getSelectedCarDetails, loadCarsTest, loadCarsTestFailure, loadCarsTestSuccess, loadCategorysSuccess, loadTestCarProgramSuccess, removeAppointmentSuccess, removeCarTestSuccess, searchCategoryProductsSuccess, sendEmailSuccess, updateSelectedCarDetailsSuccess } from "../../actions/car-test/car-test.action";

export const carTestFeatureKey = 'test-cars';

export interface CarTestState {
    carsTestDetails: Product[];
    categorys: Category[];
    programings: Programing[];
    programingAdded: Programing;
    newProduct: Product;
    deleteProductId:number;
    updateProduct:Product
    selectedCar:Product;
    selectedCarById:Product;
    carsTestByCategoryID:Product[];
    mailMessageSent: EmailMessage;
    error: any;
    status: 'pending ' | 'loading' | 'error' | 'success';
}

export const initialState: CarTestState = {
    carsTestDetails: undefined,
    categorys: undefined,
    programings: undefined,
    programingAdded: undefined,
    newProduct: undefined,
    deleteProductId: undefined,
    updateProduct: undefined,
    selectedCar: undefined,
    selectedCarById: undefined,
    carsTestByCategoryID: undefined,
    mailMessageSent:undefined,
    error: null,
    status: 'pending ',
};

export const carTestStateReducer = createReducer(
    //Supply the initial state
    initialState,

    on(addCarTestSuccess, (state, { newProduct }) => ({
        ...state, 
        newProduct: newProduct,
        error: null,
        status: 'success',})
    ),
    on(updateSelectedCarDetailsSuccess, (state, { carDetails }) => ({
        ...state, 
        selectedCarById: carDetails,
        error: null,
        status: 'success',})
      ),
      on(removeCarTestSuccess, (state, { id }) => ({
        ...state,
        carsTestDetails: state.carsTestDetails.filter((carsTest) => carsTest.id !== id),
        deleteProductId: id,
        error: null,
        status: 'success'
    })),
    // Trigger loading the Car Test
    on(
        loadCarsTest,
        (state) => ({
            ...state,
           status: 'loading',
        })
    ),
    // Handle successfully loaded carsTestDetails
    on(
        loadCarsTestSuccess,
        (state, {carsTest}) => ({
            ...state,
            carsTestDetails: carsTest,
            error: null,
            status: 'success',
        })
    ),
    //Handle carsTestDetails load failure
    on(
        loadCarsTestFailure,
        (state, {error}) => ({
            ...state,
            error: error,
            status: 'error'
        })
    ),  
    on(
        getSelectedCarDetails,
            (state, action) => ({
                ...state,
                selectedCar: action.car,
            })
    ),
    on(
        getCarDetailsByIdSuccess,
            (state, {car}) => ({
                ...state,
                selectedCarById: car,
                programings: car.programings,
                error: null,
                status: 'success',
            })
    ),
    on(
        searchCategoryProductsSuccess,
            (state, {cars}) => ({
                ...state,
                carsTestByCategoryID: cars,
                error: null,
                status: 'success',
            })
    ),
    on(
        loadCategorysSuccess,
            (state, {categorys}) => ({
                ...state,
                categorys: categorys,
                error: null,
                status: 'success',
            })
    ),
    on(addProgramingCarTestSuccess, (state, { programingAdded }) => ({
        ...state, 
        programingAdded: programingAdded,
        error: null,
        status: 'success',})
    ),
    on(removeAppointmentSuccess, (state, { id }) => ({
        ...state,
        programings: state.programings.filter((appointment) => appointment.id !== id),
        error: null,
        status: 'success'
    })),
    on(
        loadTestCarProgramSuccess,
            (state, {programings}) => ({
                ...state,
                programings: programings,
                
                error: null,
                status: 'success',
            })
    ),
    on(
        sendEmailSuccess,
            (state, {mailMessageSent}) => ({
                ...state,
                mailMessageSent: mailMessageSent,
                error: null,
                status: 'success',
            })
    ),
);