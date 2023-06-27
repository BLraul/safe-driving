import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AboutAPP, ReleaseNote, VersionData } from 'src/app/useful/about-page-interfaces';
import * as fromAboutPageReducer from '../../reducers/about-page/about-page.reducer';

export const selectState = createFeatureSelector<fromAboutPageReducer.State>(
    fromAboutPageReducer.aboutAppFeatureKey
);

export const aboutApp = createSelector(
    selectState,
    (state: fromAboutPageReducer.State): AboutAPP => state.aboutApp
);

export const releaseNotes = createSelector(
    selectState,
    (state: fromAboutPageReducer.State): ReleaseNote[] =>
        state.aboutApp?.releaseNotes
);

export const beBuildVersion = createSelector(
    selectState,
    (state: fromAboutPageReducer.State): VersionData =>
        state.aboutApp?.beBuildVersion
);
