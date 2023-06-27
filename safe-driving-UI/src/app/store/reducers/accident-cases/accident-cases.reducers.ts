import { createReducer, on } from "@ngrx/store";
import { AccidentDetails } from "src/app/useful/accident-details-interfaces";
import { CaseMarker, CaseStatus } from "src/app/useful/interfaces";
import { getAccidentDetailsByCaseIdFailure, getAccidentDetailsByCaseIdSuccess, getMarkersByStatusFailure, getMarkersByStatusSuccess, setCurrentCaseSelectionView } from "../../actions/accident-case/accident-case.actions";

export const accidentCasesFeatureKey = 'cases';
export interface AccidentCasesState {
    newCasesMarkers: CaseMarker[];
    preselectionCasesMarkers: CaseMarker[];
    selectedAccidentDetails: AccidentDetails;
    currentCaseSelectionView: CaseStatus;
    error: any;
}
export const initialState: AccidentCasesState = {
    newCasesMarkers: undefined,
    preselectionCasesMarkers: undefined,
    selectedAccidentDetails: undefined,
    currentCaseSelectionView: CaseStatus.new,
    error: undefined,
};
export const accidentCasesStateReducer = createReducer(
    initialState,
    on(getMarkersByStatusSuccess, (state, { casesMarkers: cases }) => ({
        ...state,
        newCasesMarkers: getCaseMarkersWithStatusNew(cases),
    })),
    on(getMarkersByStatusFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
    on(getAccidentDetailsByCaseIdSuccess, (state, { accidentDetails: accidentData }) => ({
        ...state,
        selectedAccidentDetails: accidentData,
        })),
    on(getAccidentDetailsByCaseIdFailure, (state, { error }) => ({
        ...state,
        error: error,
    })),
    on(setCurrentCaseSelectionView, (state, { currentView: selectedView }) => ({
        ...state,
        currentCaseSelectionView: selectedView,
    })),
    on(setCurrentCaseSelectionView, (state, { currentView: selectedView }) => ({
        ...state,
        currentCaseSelectionView: selectedView,
    }))
);
function getCaseMarkersWithStatusNew(caseMarkers: CaseMarker[]) {
    return caseMarkers.filter((m) => m.status === CaseStatus.new);
}

// function getCaseMarkersWithStatusPreselection(caseMarkers: CaseMarker[]) {
//     return caseMarkers?.filter((m) => m.status === CaseStatus.preselection);
// }