import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccidentDetails } from 'src/app/useful/accident-details-interfaces';
import { CaseMarker, CaseStatus } from 'src/app/useful/interfaces';
import * as fromCasesReducer from '../../reducers/accident-cases/accident-cases.reducers';

export const selectCases = createFeatureSelector<fromCasesReducer.AccidentCasesState>(
        fromCasesReducer.accidentCasesFeatureKey
    );
export const newCasesMarkers = createSelector(selectCases,
    (state: fromCasesReducer.AccidentCasesState): CaseMarker[] =>
        state.newCasesMarkers
);
export const preselectionCasesMarkers = createSelector(selectCases,
    (state: fromCasesReducer.AccidentCasesState): CaseMarker[] =>
        state.preselectionCasesMarkers
);
export const selectedAccidentDetails = createSelector(selectCases,
    (state: fromCasesReducer.AccidentCasesState): AccidentDetails =>
        state.selectedAccidentDetails
);

export const currentCaseSelectionView = createSelector(
    selectCases,
    (state: fromCasesReducer.AccidentCasesState): CaseStatus =>
        state.currentCaseSelectionView
);