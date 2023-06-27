import { createAction, props } from "@ngrx/store";
import { AccidentDetails } from "src/app/useful/accident-details-interfaces";
import { CaseMarker, CaseProcessingStatus, CaseStatus } from "src/app/useful/interfaces";



export class AccidentCasesActionTypes {
    static GET_CASES_MARKERS_BY_STATUS = 
        '[CASES] GET CASES MARKERS BY STATUS';
    static GET_CASES_MARKERS_BY_STATUS_SUCCESS =
        '[CASES] GET CASES MARKERS BY STATUS SUCCESS';
    static GET_CASES_MARKERS_BY_STATUS_FAILURE =
        '[CASES] GET CASES MARKERS BY STATUS FAILURE';

    static UPDATE_CASE_STATUS_FOR_MARKER =
        '[CASES] UPDATE_CASE_STATUS_FOR_MARKER';
    static UPDATE_CASE_STATUS_FOR_MARKER_SUCCESS =
        '[CASES] UPDATE_CASE_STATUS_FOR_MARKER_SUCCESS';
    static UPDATE_CASE_STATUS_FOR_MARKER_FAILURE =
        '[CASES] UPDATE_CASE_STATUS_FOR_MARKER_FAILURE';

    static UPDATE_MULTIPLE_CASES_STATUS =
        '[CASES] UPDATE_MULTIPLE_CASES_STATUS';
    static UPDATE_MULTIPLE_CASES_STATUS_SUCCESS =
        '[CASES] UPDATE_MULTIPLE_CASES_STATUS_SUCCESS';
    static UPDATE_MULTIPLE_CASES_STATUS_FAILURE =
        '[CASES] UPDATE_MULTIPLE_CASES_STATUS_FAILURE';

        static SET_CURRENT_CASE_SELECTION_VIEW =
        '[CASES] SET_CURRENT_CASE_SELECTION_VIEW';

    static GET_ACCIDENT_DETAILS_BY_CASE_ID =
        '[CASES] GET_ACCIDENT_DETAILS_BY_CASE_ID';
    static GET_ACCIDENT_DETAILS_BY_CASE_ID_SUCCESS =
        '[CASES] GET_ACCIDENT_DETAILS_BY_CASE_ID_SUCCESS';
    static GET_ACCIDENT_DETAILS_BY_CASE_ID_FAILURE =
        '[CASES] GET_ACCIDENT_DETAILS_BY_CASE_ID_FAILURE';
}

export const getMarkersByStatus = createAction(
    AccidentCasesActionTypes.GET_CASES_MARKERS_BY_STATUS,
    props<{ status: CaseStatus }>()
);

export const getMarkersByStatusSuccess = createAction(
    AccidentCasesActionTypes.GET_CASES_MARKERS_BY_STATUS_SUCCESS,
    props<{ casesMarkers: CaseMarker[] }>()
);

export const getMarkersByStatusFailure = createAction(
    AccidentCasesActionTypes.GET_CASES_MARKERS_BY_STATUS_FAILURE,
    props<{ error: any }>()
);

export const updateCaseStatusForMarker = createAction(
    AccidentCasesActionTypes.UPDATE_CASE_STATUS_FOR_MARKER,
    props<{ caseMarker: CaseMarker }>()
);

export const updateCaseStatusForMarkerSuccess = createAction(
    AccidentCasesActionTypes.UPDATE_CASE_STATUS_FOR_MARKER_SUCCESS,
    props<{ caseMarker: CaseMarker }>()
);

export const updateCaseStatusForMarkerFailure = createAction(
    AccidentCasesActionTypes.UPDATE_CASE_STATUS_FOR_MARKER_FAILURE,
    props<{ error: any }>()
);

export const updateMultipleCasesStatus = createAction(
    AccidentCasesActionTypes.UPDATE_MULTIPLE_CASES_STATUS,
    props<{ cases: CaseMarker[] }>()
);

export const updateMultipleCasesStatusSuccess = createAction(
    AccidentCasesActionTypes.UPDATE_MULTIPLE_CASES_STATUS_SUCCESS,
    props<{ casesProcessingStatusList: CaseProcessingStatus[] }>()
);

export const updateMultipleCasesStatusFailure = createAction(
    AccidentCasesActionTypes.UPDATE_MULTIPLE_CASES_STATUS_FAILURE,
    props<{ error: any }>()
);

export const setCurrentCaseSelectionView = createAction(
    AccidentCasesActionTypes.SET_CURRENT_CASE_SELECTION_VIEW,
    props<{ currentView: CaseStatus }>()
);

export const getAccidentDetailsByCaseId = createAction(
    AccidentCasesActionTypes.GET_ACCIDENT_DETAILS_BY_CASE_ID,
    props<{ caseId: number }>()
);

export const getAccidentDetailsByCaseIdSuccess = createAction(
    AccidentCasesActionTypes.GET_ACCIDENT_DETAILS_BY_CASE_ID_SUCCESS,
    props<{ accidentDetails: AccidentDetails }>()
);

export const getAccidentDetailsByCaseIdFailure = createAction(
    AccidentCasesActionTypes.GET_ACCIDENT_DETAILS_BY_CASE_ID_FAILURE,
    props<{ error: any }>()
);