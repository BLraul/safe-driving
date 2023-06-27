import { createAction, props } from '@ngrx/store';
import { UserData, UserDetails } from 'src/app/useful/interfaces';

export class UserActionTypes {
    static GET_USER_DETAILS = '[USER] GET DETAILS';
    static SET_USER_DETAILS_SUCCESS = '[USER] GET DETAILS SUCCESS';
    static SET_USER_DETAILS_FAILURE = '[USER] GET DETAILS FAILURE';

    static LOAD_USER_DETAILS_BY_USER_RESPONSE = '[USER] LOAD USER DETAILS BY USER RESPONSE';
    static SET_ROLES_BY_USER_RESPONSE = '[USER] SET ROLES BY USER RESPONSE ';
    static SET_TOKEN_BY_USER_RESPONSE = '[USER] SET TOKEN BY USER RESPONSE';
}

export const getUserDetails = createAction(UserActionTypes.GET_USER_DETAILS);

export const getUserDetailsSucces = createAction(
    UserActionTypes.SET_USER_DETAILS_SUCCESS,
    props<{ userDetails: UserData }>()
);

export const getUserDetailsFailure = createAction(
    UserActionTypes.SET_USER_DETAILS_FAILURE,
    props<{ error: any }>()
);
