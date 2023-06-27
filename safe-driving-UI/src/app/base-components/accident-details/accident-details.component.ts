import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { getAccidentDetailsByCaseId, getAccidentDetailsByCaseIdSuccess, getMarkersByStatus, updateCaseStatusForMarker, updateCaseStatusForMarkerFailure, updateCaseStatusForMarkerSuccess } from 'src/app/store/actions/accident-case/accident-case.actions';
import { currentCaseSelectionView, newCasesMarkers, preselectionCasesMarkers, selectedAccidentDetails } from 'src/app/store/selectors/accident-cases/accident-cases.selectors';
import { AccidentDetails } from 'src/app/useful/accident-details-interfaces';
import { CaseMarker, CaseStatus, MarkerColor } from 'src/app/useful/interfaces';
import { CoverageMapsComponent } from '../coverage-maps/coverage-maps.component';

@Component({
  selector: 'app-accident-details',
  templateUrl: './accident-details.component.html',
  styleUrls: ['./accident-details.component.scss']
})
export class AccidentDetailsComponent implements OnInit, OnDestroy {
    @ViewChild(CoverageMapsComponent ) mapsChildComponenet: CoverageMapsComponent ; 

  selectedMarkerObs$: Subject<CaseMarker> = new BehaviorSubject(null);
  selectedCaseMarker: CaseMarker;
  accidentDetails$: Observable<AccidentDetails>;
  allMarkersInCurrentView: CaseMarker[];
  destroyed$: Subject<void> = new Subject();
  markersColor = MarkerColor.new;
  currentMarkersView: CaseStatus;
  traceMarkers: CaseMarker[] = [];
  agentNotes: string[] = [];
  agentChat: string[] = [];
  constructor(
      private store: Store,
      private router: Router,
      private route: ActivatedRoute,
      private actions$: Actions
  ) {}

  ngOnInit(): void {
      this.store.select(currentCaseSelectionView).pipe(takeUntil(this.destroyed$)).subscribe((selectedView) => {
              this.currentMarkersView = selectedView;
              let markersSelector =selectedView === CaseStatus.preselection ? preselectionCasesMarkers : newCasesMarkers;
              combineLatest([
                  this.route.params,
                  this.store.select(markersSelector),
              ]).pipe(takeUntil(this.destroyed$)).subscribe(([params, markersInCurrentView]) => {
                      if (!!markersInCurrentView && params['caseId'] != 0) {
                          this.setMarkersPropertiesForCurrentView(markersInCurrentView, params['caseId']);
                          this.selectedMarkerObs$.next(this.selectedCaseMarker);
                          this.getCrashDetails();
                      } else if (!markersInCurrentView || params['caseId'] == 0) {
                          this.clearCrashDetailsData();
                      }
                  });
          });
      this.accidentDetails$ = this.store.select(selectedAccidentDetails);
      this.accidentDetails$.pipe(takeUntil(this.destroyed$)).subscribe((cd) => {this.getTraceForCrashDetails(cd),
            this.getAgentNotesAndAgentChats(cd) 
          }); 
      this.registerRefreshMarkersListAfterChangeStatus();
  }

  ngOnDestroy(): void {
      this.selectedMarkerObs$.next(null);
      this.selectedMarkerObs$.complete();
      this.destroyed$.next();
      this.destroyed$.complete();
  }

  public getCrashDetails(): void {
      if (!!this.selectedCaseMarker?.caseId) {
          this.store.dispatch(
            getAccidentDetailsByCaseId({
                  caseId: this.selectedCaseMarker?.caseId,
              })
          );
      }
  }

  setMarkersPropertiesForCurrentView(currentViewMarkers, selectedCaseId) {
      this.selectedCaseMarker = currentViewMarkers.find(
          (c) => c.caseId == selectedCaseId
      );
      this.markersColor =
          MarkerColor[this.selectedCaseMarker?.status.toLocaleLowerCase()];
      this.allMarkersInCurrentView = currentViewMarkers;
  }

  changeCaseStatus(status: string) {
      const selectedMarkerToUpdate = { ...this.selectedCaseMarker };
      selectedMarkerToUpdate.status = status;
      this.store.dispatch(
          updateCaseStatusForMarker({
              caseMarker: selectedMarkerToUpdate,
          })
      );
      this.mapsChildComponenet?.unselectAllMarkers();
      this.traceMarkers = [];
  }

  openCrashDetails(caseId: number) {
      this.router.navigate(['accident-details', caseId]);
  }

  private clearCrashDetailsData() {
      this.store.dispatch(
          getAccidentDetailsByCaseIdSuccess({
              accidentDetails: {} as AccidentDetails,
          })
      );
      this.selectedMarkerObs$.next(null);
      this.traceMarkers = [];
  }

  private registerRefreshMarkersListAfterChangeStatus() {
      this.actions$
          .pipe(
              ofType(
                  updateCaseStatusForMarkerSuccess,
                  updateCaseStatusForMarkerFailure
              ),
              takeUntil(this.destroyed$)
          )
          .subscribe(() => {
              if (this.currentMarkersView === CaseStatus.preselection) {
                  this.store.dispatch(
                      getMarkersByStatus({ status: CaseStatus.preselection })
                  );
              } else {
                  this.store.dispatch(
                      getMarkersByStatus({ status: CaseStatus.new })
                  );
              }
          });
  }

  private getTraceForCrashDetails(crashDetails: AccidentDetails) {
      if (!!crashDetails?.trace) {
          this.traceMarkers = [];
          this.addTraceMarkerWithCoordinates(
              crashDetails?.trace?.pearl1Lat,
              crashDetails?.trace?.pearl1Lng
          );
          this.addTraceMarkerWithCoordinates(
              crashDetails?.trace?.pearl2Lat,
              crashDetails?.trace?.pearl2Lng
          );
          this.addTraceMarkerWithCoordinates(
              crashDetails?.trace?.pearl3Lat,
              crashDetails?.trace?.pearl3Lng
          );
          this.addTraceMarkerWithCoordinates(
              crashDetails?.trace?.pearl4Lat,
              crashDetails?.trace?.pearl4Lng
          );
      }
  }

  private addTraceMarkerWithCoordinates(traceLat, traceLng) {
      if (!!traceLat && !!traceLat) {
          let traceMarker: CaseMarker = {
              lat: traceLat,
              lng: traceLng,
          };
          this.traceMarkers.push(traceMarker);
      }
  }

  private getAgentNotesAndAgentChats(crashDetails: AccidentDetails) {
    if (!!crashDetails?.agentReport?.agentNotes || !!crashDetails?.agentReport?.agentChat) {
        const agentNotes = crashDetails.agentReport.agentNotes;
        const agentChat = crashDetails.agentReport.agentChat
        this.splitAgentNotesAndAgentChats(agentNotes, agentChat)
    }
}

splitAgentNotesAndAgentChats(agentNotes:string, agentChat:string){
    let agentNotesSplitted = agentNotes.split("\n"); 
    agentNotesSplitted.forEach(note=>this.agentNotes.push(note));
    let agentChatSplitted = agentChat.split("\n"); 
    agentChatSplitted.forEach(agent=>this.agentChat.push(agent));
}
}
