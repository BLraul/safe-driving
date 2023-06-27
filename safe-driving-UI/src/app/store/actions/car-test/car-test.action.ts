import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/base-components/test-car-page/test-car-page-framework/test-car-page-sidebar/category";
import { EmailMessage } from "src/app/useful/email-message";
import { Product} from "src/app/useful/product";
import { Programing } from "src/app/useful/programing-model";



export class CarTestActionTypes {
  
    static ADD_CAR_TEST =
        '[TEST-CARS] ADD_CAR_TEST';
    static ADD_CAR_TEST_SUCCESS =
        '[TEST-CARS] ADD_CAR_TEST_SUCCESS';
    static ADD_CAR_TEST_FAILURE =
        '[TEST-CARS] ADD_CAR_TEST_FAILURE';

    static REMOVE_CAR_TEST =
        '[TEST-CARS] REMOVE_CAR_TEST';
    static REMOVE_CAR_TEST_SUCCESS =
        '[TEST-CARS] REMOVE_CAR_TEST_SUCCESS';
    static REMOVE_CAR_TEST_FAILURE =
        '[TEST-CARS] REMOVE_CAR_TEST_FAILURE';

    static LOAD_CARS_TEST =
        '[TEST-CARS] LOAD_CARS_TEST';
    static LOAD_CARS_TEST_SUCCESS =
        '[TEST-CARS] LOAD_CARS_TEST_SUCCESS';
    static LOAD_CARS_TEST_FAILURE =
        '[TEST-CARS] LOAD_CARS_TEST_FAILURE';

    static GET_SELECTED_CAR_DETAILS =
        '[TEST-CARS] GET_SELECTED_CAR_DETAILS';

    static UPDATE_SELECTED_CAR_DETAILS =
        '[TEST-CARS] UPDATE_SELECTED_CAR_DETAILS';
    static UPDATE_SELECTED_CAR_DETAILS_SUCCESS =
        '[TEST-CARS] UPDATE_SELECTED_CAR_DETAILS_SUCCESS';
    static UPDATE_SELECTED_CAR_DETAILS_FAILURE =
        '[TEST-CARS] UPDATE_SELECTED_CAR_DETAILS_FAILURE';

    static GET_CAR_DETAILS_BY_ID =
        '[TEST-CARS] GET_CAR_DETAILS_BY_ID';
    static GET_CAR_DETAILS_BY_ID_SUCCESS =
        '[TEST-CARS] GET_CAR_DETAILS_BY_ID_SUCCESS';
    static GET_CAR_DETAILS_BY_ID_FAILURE =
        '[TEST-CARS] GET_CAR_DETAILS_BY_ID_FAILURE';

    static SEARCH_CATEGORY_PRODUCTS =
        '[TEST-CARS] SEARCH_CATEGORY_PRODUCTS';
    static SEARCH_CATEGORY_PRODUCTS_SUCCESS =
        '[TEST-CARS] SEARCH_CATEGORY_PRODUCTS_SUCCESS';
    static SEARCH_CATEGORY_PRODUCTS_FAILURE =
        '[TEST-CARS] SEARCH_CATEGORY_PRODUCTS_FAILURE';

    static LOAD_CATEGORYS =
        '[TEST-CARS] LOAD_CATEGORYS';
    static LOAD_CATEGORYS_SUCCESS =
        '[TEST-CARS] LOAD_CATEGORYS_SUCCESS';
    static LOAD_CATEGORYS_FAILURE =
        '[TEST-CARS] LOAD_CATEGORYS_FAILURE';

    static LOAD_TEST_CAR_PROGRAM =
        '[TEST-CARS] LOAD_TEST_CAR_PROGRAM';
    static LOAD_TEST_CAR_PROGRAM_SUCCESS =
        '[TEST-CARS] LOAD_TEST_CAR_PROGRAM_SUCCESS';
    static LOAD_TEST_CAR_PROGRAM_FAILURE =
        '[TEST-CARS] LOAD_TEST_CAR_PROGRAM_FAILURE';

    static ADD_PROGRAMING_CAR_TEST =
        '[TEST-CARS] ADD_PROGRAMING_CAR_TEST';
    static ADD_PROGRAMING_CAR_TEST_SUCCESS =
        '[TEST-CARS] ADD_PROGRAMING_CAR_TEST_SUCCESS';
    static ADD_PROGRAMING_CAR_TEST_FAILURE =
        '[TEST-CARS] ADD_PROGRAMING_CAR_TEST_FAILURE';

    static SEND_EMAIL =
        '[TEST-CARS] SEND_EMAIL';
    static SEND_EMAIL_SUCCESS =
        '[TEST-CARS] SEND_EMAIL_SUCCESS';
    static SEND_EMAIL_FAILURE =
        '[TEST-CARS] SEND_EMAIL_FAILURE';

    static REMOVE_APPOINTMENT =
        '[TEST-CARS] REMOVE_APPOINTMENT';
    static REMOVE_APPOINTMENT_SUCCESS =
        '[TEST-CARS] REMOVE_APPOINTMENT_SUCCESS';
    static REMOVE_APPOINTMENT_FAILURE =
        '[TEST-CARS] REMOVE_APPOINTMENT_FAILURE';
}


export const loadCarsTest = createAction(
    CarTestActionTypes.LOAD_CARS_TEST
);
export const loadCarsTestSuccess = createAction(
    CarTestActionTypes.LOAD_CARS_TEST_SUCCESS,
    props<{carsTest: Product[]}>()
);
export const loadCarsTestFailure = createAction(
    CarTestActionTypes.LOAD_CARS_TEST_FAILURE,
    props<{error:any}>()
);


export const addCarTest = createAction(
  CarTestActionTypes.ADD_CAR_TEST,
  (product: Product) => ({ product })
  // props<{ product: Product }>()
);
export const addCarTestSuccess = createAction(
  CarTestActionTypes.ADD_CAR_TEST_SUCCESS,
  // props<{ newProduct: Product }>(),
  (newProduct: Product) => ({ newProduct })
);


export const updateSelectedCarDetails = createAction(
  CarTestActionTypes.UPDATE_SELECTED_CAR_DETAILS,
  (carDetails: Product) => ({ carDetails })
  // props<{ carDetails: Product }>()
);
export const updateSelectedCarDetailsSuccess = createAction(
  CarTestActionTypes.UPDATE_SELECTED_CAR_DETAILS_SUCCESS,
  props<{ carDetails: Product }>()
);
export const updateSelectedCarDetailsFailure = createAction(
  CarTestActionTypes.UPDATE_SELECTED_CAR_DETAILS_FAILURE,
  props<{ error: any }>()
);


export const removeCarTest = createAction(
  CarTestActionTypes.REMOVE_CAR_TEST,
  (id: number)=>({id})
);
export const removeCarTestSuccess = createAction(
CarTestActionTypes.REMOVE_CAR_TEST_SUCCESS,
(id: number)=>({id})
);
export const removeCarTestFailure = createAction(
CarTestActionTypes.REMOVE_CAR_TEST_FAILURE,
(error:any)=>({error})
);

export const getSelectedCarDetails = createAction(
    CarTestActionTypes.GET_SELECTED_CAR_DETAILS,
    props<{ car: Product }>()
);

export const getCarDetailsById = createAction(
  CarTestActionTypes.GET_CAR_DETAILS_BY_ID,
  props<{carId: number}>()
);
export const getCarDetailsByIdSuccess = createAction(
  CarTestActionTypes.GET_CAR_DETAILS_BY_ID_SUCCESS,
  props<{car: Product}>()
);
export const getCarDetailsByIdFailure = createAction(
  CarTestActionTypes.GET_CAR_DETAILS_BY_ID_FAILURE,
  props<{error:any}>()
);

export const searchCategoryProducts = createAction(
  CarTestActionTypes.SEARCH_CATEGORY_PRODUCTS,
  props<{categoryId: number}>()
);
export const searchCategoryProductsSuccess = createAction(
  CarTestActionTypes.SEARCH_CATEGORY_PRODUCTS_SUCCESS,
  props<{cars: Product[]}>()
);
export const searchCategoryProductsFailure = createAction(
  CarTestActionTypes.SEARCH_CATEGORY_PRODUCTS_FAILURE,
  props<{error:any}>()
);

export const loadCategorys = createAction(
    CarTestActionTypes.LOAD_CATEGORYS
);
export const loadCategorysSuccess = createAction(
    CarTestActionTypes.LOAD_CATEGORYS_SUCCESS,
    props<{categorys: Category[]}>()
);
export const loadCategorysFailure = createAction(
    CarTestActionTypes.LOAD_CATEGORYS_FAILURE,
    props<{error:any}>()
);


export const loadTestCarProgramingsByCarId = createAction(
    CarTestActionTypes.LOAD_TEST_CAR_PROGRAM,
    props<{carId: number}>()
);
export const loadTestCarProgramSuccess = createAction(
    CarTestActionTypes.LOAD_TEST_CAR_PROGRAM_SUCCESS,
    props<{programings: Programing[]}>()
);
export const loadTestCarProgramFailure = createAction(
    CarTestActionTypes.LOAD_TEST_CAR_PROGRAM_FAILURE,
    props<{error:any}>()
);


export const addProgramingCarTest = createAction(
    CarTestActionTypes.ADD_PROGRAMING_CAR_TEST,
    (programing: Programing) => ({ programing })
    // props<{ product: Product }>()
  );
  export const addProgramingCarTestSuccess = createAction(
    CarTestActionTypes.ADD_PROGRAMING_CAR_TEST_SUCCESS,
    // props<{ newProduct: Product }>(),
    (programingAdded: Programing) => ({ programingAdded })
  );

  export const sendEmail = createAction(
    CarTestActionTypes.SEND_EMAIL,
    (emailMessage: EmailMessage) => ({ emailMessage })
  );
  export const sendEmailSuccess = createAction(
    CarTestActionTypes.SEND_EMAIL_SUCCESS,
    (mailMessageSent: EmailMessage) => ({ mailMessageSent })
  );
  export const sendEmailFailure = createAction(
    CarTestActionTypes.SEND_EMAIL_FAILURE,
    props<{error:any}>()
  );

  export const removeAppointment = createAction(
    CarTestActionTypes.REMOVE_APPOINTMENT,
    (id: number)=>({id})
  );
  export const removeAppointmentSuccess = createAction(
  CarTestActionTypes.REMOVE_APPOINTMENT_SUCCESS,
  (id: number)=>({id})
  );
  export const removeAppointmentFailure = createAction(
  CarTestActionTypes.REMOVE_APPOINTMENT_FAILURE,
  (error:any)=>({error})
  );