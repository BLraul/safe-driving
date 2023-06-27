import { createAction, props } from '@ngrx/store';
import { AboutAPP } from 'src/app/useful/about-page-interfaces';

export class AboutAppActionTypes {
    static GET_ABOUT_APP = '[ABOUT PAGE] GET_ABOUT_APP';
    static GET_ABOUT_APP_SUCCESS = '[ABOUT PAGE] GET_ABOUT_APP_SUCCESS';
    static GET_ABOUT_APP_FAILURE = '[ABOUT PAGE] GET_ABOUT_APP_FAILURE';
}

export const getAboutApp = createAction(AboutAppActionTypes.GET_ABOUT_APP);

export const getAboutAppSucces = createAction(
    AboutAppActionTypes.GET_ABOUT_APP_SUCCESS,
    props<{ aboutApp: AboutAPP }>()
);

export const getAboutAppFailure = createAction(
    AboutAppActionTypes.GET_ABOUT_APP_FAILURE,
    props<{ error: any }>()
);
