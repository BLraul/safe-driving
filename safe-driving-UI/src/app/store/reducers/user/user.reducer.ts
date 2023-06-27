import { createReducer, on } from '@ngrx/store';
import { UserData, UserDetails } from 'src/app/useful/interfaces';
import {
    getUserDetails,
    getUserDetailsFailure,
    getUserDetailsSucces,
} from '../../actions/user/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
    userDetails: UserData;
    userDetailsByResponse: UserDetails,
    roles:[],
    token: string,
    error: any;
}

export const initialState: UserState = {
    userDetails: undefined,
    userDetailsByResponse: undefined,
    roles:undefined,
    token: undefined,
    error: undefined,
};

export const userStateReducer = createReducer(
    initialState,

    on(getUserDetails, (state) => ({ ...state })),

    on(getUserDetailsSucces, (state, { userDetails }) => ({
        ...state,
        userDetails,
    })),
    on(getUserDetailsFailure, (state, { error }) => ({
        ...state,
        roles: undefined,
        error: error,
    })),
);
