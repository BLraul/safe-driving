import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, pluck, throwError as observableThrowError, throwError, } from 'rxjs';
import { AccidentDetails } from 'src/app/useful/accident-details-interfaces';
import { invalidStructureMsg } from 'src/app/useful/generic-texts';
import { CaseMarker, CaseProcessingStatus, CaseStatus, IServiceError, MarkersList } from 'src/app/useful/interfaces';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AccidentCasesService {

  constructor(private httpService: HttpService) { }

  getCasesMarkersByStatus(caseStatus: CaseStatus): Observable<CaseMarker[]> {
    const url: string = 'cases/markers';
    return this.httpService.getAccidentCases(url, { params: { status: caseStatus } })
        .pipe(pluck('markers'),map((markers) => markers),catchError(this.errorHandler));
  }
  getAccidentDetails(caseId: number): Observable<AccidentDetails> {
    const url: string = 'cases/accidentDetails';
    return this.httpService.getAccidentCases(url, { params: { caseId: caseId } }).pipe(
      map((resp) => resp),catchError(this.errorHandler));
  }
  updateCaseStatusForMarker(body: CaseMarker): Observable<any> {
    const url: string = 'cases/status';
    return this.httpService.put(url, body).pipe(map((resp: CaseMarker) =>
          !!resp ? resp : throwError(invalidStructureMsg)),
      catchError((err: IServiceError) => throwError(err))
    );
  }

updateMultipleCasesStatus(casesMarkers: CaseMarker[]): Observable<any> {
  const url: string = 'cases/status-multiple';
  let markersList: MarkersList = { markers: casesMarkers };
  return this.httpService.put(url, markersList).pipe(
      pluck('statusList'),
      map((resp: CaseProcessingStatus[]) =>
          !!resp ? resp : throwError(invalidStructureMsg)
      ),
      catchError((err: IServiceError) => throwError(err))
  );
}

private errorHandler(error: HttpErrorResponse) {
  return observableThrowError(error.message || 'Server Error');
}
}
