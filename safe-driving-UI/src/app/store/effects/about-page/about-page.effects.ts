import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AboutPageService } from 'src/app/services/about-page/about-page.service';
import {
    AboutAppActionTypes,
    getAboutApp,
} from '../../actions/about-page/about-page.actions';
import packageJson from '../../../../../package.json';
import { AboutAPP, VersionData } from 'src/app/useful/about-page-interfaces';

@Injectable()
export class AboutPageEffects {
    constructor(
        private actions$: Actions,
        private aboutPageService: AboutPageService
    ) {}

    getReleaseNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAboutApp),
            exhaustMap(() =>
                combineLatest([
                    this.aboutPageService.getBEVersion(),
                    this.aboutPageService.getReleaseNotes(),
                ]).pipe(
                    map(([beVersion,releaseNote ]) => {
                        let feVersion:VersionData = {version:packageJson.version,
                        buildDate: packageJson.buildDate};
                        let aboutAppData: AboutAPP = {
                            releaseNotes: releaseNote,
                            beBuildVersion: beVersion,
                            feVersion,
                        };
                        return {
                            type: AboutAppActionTypes.GET_ABOUT_APP_SUCCESS,
                            aboutApp: aboutAppData,
                        };
                    }),
                    catchError((error) =>
                        of({
                            type: AboutAppActionTypes.GET_ABOUT_APP_FAILURE,
                            error: error,
                        })
                    )
                )
            )
        )
    );
}
