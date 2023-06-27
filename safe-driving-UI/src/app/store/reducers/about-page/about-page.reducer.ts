import { createReducer, on } from '@ngrx/store';
import { AboutAPP } from 'src/app/useful/about-page-interfaces';
import {
    getAboutApp,
    getAboutAppSucces,
    getAboutAppFailure,
} from '../../actions/about-page/about-page.actions';

export const aboutAppFeatureKey = 'aboutApp';

export interface State {
    aboutApp: AboutAPP;
    error: any;
}

export const initialState: State = {
    aboutApp: undefined,
    error: undefined,
};

export const aboutAppReducer = createReducer(
    initialState,

    on(getAboutApp, (state) => ({ ...state })),

    on(getAboutAppSucces, (state, { aboutApp }) => ({
        ...state,
        aboutApp,
    })),
    on(getAboutAppFailure, (state, { error }) => ({
        ...state,
        error: error,
    }))
);
