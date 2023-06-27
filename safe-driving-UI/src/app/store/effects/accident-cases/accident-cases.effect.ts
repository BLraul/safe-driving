import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, pluck, switchMap } from 'rxjs/operators';
import { AccidentCasesService } from 'src/app/services/accident-cases/accident-cases.service';
import { AccidentDetails } from 'src/app/useful/accident-details-interfaces';
import { CaseMarker, CaseProcessingStatus, IServiceError, ProcessingStatus } from 'src/app/useful/interfaces';
import {
    getMarkersByStatus,
    getMarkersByStatusSuccess,
    getMarkersByStatusFailure,
    getAccidentDetailsByCaseId,
    AccidentCasesActionTypes,
    updateCaseStatusForMarker,
    updateCaseStatusForMarkerSuccess,
    updateCaseStatusForMarkerFailure,
    getAccidentDetailsByCaseIdSuccess,
    updateMultipleCasesStatus,
    updateMultipleCasesStatusFailure,
    updateMultipleCasesStatusSuccess,
} from '../../actions/accident-case/accident-case.actions';

@Injectable()
export class AccidentCasesEffects {
    constructor(
        private actions$: Actions,
        private accidentCasesService: AccidentCasesService
    ) {}

    getCasesMarkersByStatus$ = createEffect(() => this.actions$.pipe(
        ofType(getMarkersByStatus),pluck('status'),exhaustMap((caseStatus) => {
                return this.accidentCasesService.getCasesMarkersByStatus(caseStatus)
                    .pipe(switchMap((markers) => [getMarkersByStatusSuccess({casesMarkers: markers,}),
                        ]),
                        catchError((error) => [getMarkersByStatusFailure({ error: error }),
                        ])
                    );
            })
        )
    );
    getAccidentDetailsForCaseId$ = createEffect(() => this.actions$.pipe(
            ofType(getAccidentDetailsByCaseId),pluck('caseId'),exhaustMap((caseId: number) => {
                return this.accidentCasesService.getAccidentDetails(caseId).pipe(
                    map((accidentDetail: AccidentDetails) => {
                        return {
                            type: AccidentCasesActionTypes.GET_ACCIDENT_DETAILS_BY_CASE_ID_SUCCESS,
                            accidentDetails: accidentDetail,
                        };
                    }),
                    catchError((error) => {
                        return of({
                            type: AccidentCasesActionTypes.GET_ACCIDENT_DETAILS_BY_CASE_ID_FAILURE,
                            error: error,
                        });
                    })
                );
            })
        )
    );

    private _updateCaseStatusForMarker$ = createEffect(() => this.actions$.pipe(
        ofType(updateCaseStatusForMarker),
        pluck('caseMarker'),
        exhaustMap((caseMarker: CaseMarker) => {
            return this.accidentCasesService
                .updateCaseStatusForMarker(caseMarker)
                .pipe(
                    switchMap((updatedMarker) => [
                        updateCaseStatusForMarkerSuccess({
                            caseMarker: updatedMarker,
                        }),
                        getAccidentDetailsByCaseIdSuccess({
                            accidentDetails: {} as AccidentDetails,
                        }),
                    ]),
                    catchError((error) => {
                        return [
                            updateCaseStatusForMarkerFailure({
                                error: error,
                            }),
                        ];
                    })
                );
        })
    )
    );


    updateMultipleCasesStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateMultipleCasesStatus),
            pluck('cases'),
            exhaustMap((casesToUpdate: CaseMarker[]) => {
                return this.accidentCasesService
                    .updateMultipleCasesStatus(casesToUpdate)
                    .pipe(
                        switchMap((casesUpdateStatusList) => {
                            let unprocessedCases = this.getUnprocessedCases(
                                casesUpdateStatusList
                            );
                            if (!!unprocessedCases.length) {
                                let error: IServiceError = {
                                    message: 'error:case-processing',
                                    errorDetails: {
                                        message:
                                            this.mapUnprocessedCasesToErorMessage(
                                                unprocessedCases
                                            ),
                                    },
                                };
                                return [
                                    updateMultipleCasesStatusFailure({
                                        error: error,
                                    }),
                                ];
                            }
                            return [
                                updateMultipleCasesStatusSuccess({
                                    casesProcessingStatusList:
                                        casesUpdateStatusList,
                                }),
                            ];
                        }),
                        catchError((error) => {
                            return [
                                updateMultipleCasesStatusFailure({
                                    error: error,
                                }),
                            ];
                        })
                    );
            })
        )
    );

    getUnprocessedCases(
        unprocessedCases: CaseProcessingStatus[]
    ): CaseProcessingStatus[] {
        return unprocessedCases?.filter(
            (e) => e.processStatus === ProcessingStatus.failed
        );
    }

    mapUnprocessedCasesToErorMessage(
        unprocessedCases: CaseProcessingStatus[]
    ): string {
        let errorMessage = '';
        unprocessedCases.forEach(
            (c) => (errorMessage += c.caseId + ' Error: ' + c.message + '; ')
        );
        return errorMessage;
    }

    public get updateCaseStatusForMarker$() {
        return this._updateCaseStatusForMarker$;
    }
    public set updateCaseStatusForMarker$(value) {
        this._updateCaseStatusForMarker$ = value;
    }
}


