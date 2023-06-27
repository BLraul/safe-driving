import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from 'rxjs';
import { getMarkersByStatus, getMarkersByStatusFailure, getMarkersByStatusSuccess, setCurrentCaseSelectionView, updateCaseStatusForMarker, updateMultipleCasesStatus } from 'src/app/store/actions/accident-case/accident-case.actions';
import { newCasesMarkers, preselectionCasesMarkers } from 'src/app/store/selectors/accident-cases/accident-cases.selectors';
import { CaseMarker, CaseStatus, MarkerColor } from 'src/app/useful/interfaces';

@Component({
  selector: 'app-accident-cases',
  templateUrl: './accident-cases.component.html',
  styleUrls: ['./accident-cases.component.scss']
})
export class AccidentCasesComponent implements OnInit, OnDestroy {
  currentContainerSelected = '';
  markersColor = MarkerColor.new;
  currentCasesView = CaseStatus.new;
  preselectionViewOpen$: Subject<boolean> = new BehaviorSubject(false);
  currentMapsMarkers$: Subject<CaseMarker[]> = new BehaviorSubject(null);
  destroyed$: Subject<void> = new Subject();
  constructor(
    @Inject(DOCUMENT) public document: any,
    private store: Store,
    private actions$: Actions,
    private router: Router) { 
      this.actions$
            .pipe(
                ofType(
                  getMarkersByStatusSuccess,
                  getMarkersByStatusFailure
                ),
                takeUntil(this.destroyed$)
            )
            .subscribe(() => {
                if (this.currentCasesView === CaseStatus.preselection) {
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

  ngOnInit(): void {
    this.updateCurrentMarkersObservable();
  }


  ngOnDestroy(): void {
    this.preselectionViewOpen$.complete();
    this.destroyed$.next();
    this.destroyed$.complete();
    this.currentMapsMarkers$.next(null);
    this.currentMapsMarkers$.complete();
}

updateCurrentMarkersObservable(): void {
  combineLatest([
    this.preselectionViewOpen$,
    this.store.select(newCasesMarkers),
]).subscribe(([preselectionOpen, newCasesMarkers]) => {
    if (!preselectionOpen) {
        if (!!newCasesMarkers) {
            this.markersColor = MarkerColor.new;
            this.currentMapsMarkers$.next(newCasesMarkers);
            this.store.dispatch(
                setCurrentCaseSelectionView({
                    currentView: CaseStatus.new,
                })
            );
        }
    }

          combineLatest([
            this.preselectionViewOpen$,
            this.store.select(preselectionCasesMarkers),
        ]).subscribe(([preselectionOpen, preselectionCasesMarkers]) => {
            if (!!preselectionOpen) {
                if (!!preselectionCasesMarkers) {
                    this.markersColor = MarkerColor.preselection;
                    this.currentMapsMarkers$.next(preselectionCasesMarkers);
                    this.store.dispatch(
                        setCurrentCaseSelectionView({
                            currentView: CaseStatus.preselection,
                        })
                    );
                }
            }
        });
      
      this.store.dispatch(
          getMarkersByStatus({ status: this.currentCasesView })
      );
  });
}

updateMultipleMarkersStatus(casesMarkers) {
  this.store.dispatch(updateMultipleCasesStatus({ cases: casesMarkers }));
}
updateSingleMarkersStatus(marker) {
  this.store.dispatch(updateCaseStatusForMarker({ caseMarker: marker }));
}

openCrashDetails(caseId: number) {
  this.router.navigate(['accident-details', caseId]);
}
onContainerSelection(eventName: string) {
  this.currentContainerSelected = eventName;
}

onPreselectionViewChange(preselectionSelected: boolean) {
  if (!!preselectionSelected) {
      this.currentCasesView = CaseStatus.preselection;
  } else {
      this.currentCasesView = CaseStatus.new;
  }
  this.preselectionViewOpen$.next(preselectionSelected);
  this.store.dispatch(
      getMarkersByStatus({ status: this.currentCasesView })
  );
}
}
