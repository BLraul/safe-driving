import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAboutApp } from 'src/app/store/actions/about-page/about-page.actions';
import { aboutApp } from 'src/app/store/selectors/about-page/about-page-selectors';
import { AboutAPP, VersionData } from 'src/app/useful/about-page-interfaces';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  nameAPP: string;
  aboutApp$: Observable<AboutAPP> = this.store.select(aboutApp);;
  beBuildVersion: VersionData;
  feBuildVersion: VersionData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PopUpComponent>,
    private store: Store) {
    this.nameAPP = data.name;
  }

  ngOnInit(): void {
    this.aboutApp$.subscribe((aboutAppData) => {
      if (!!aboutAppData) {
        this.beBuildVersion = aboutAppData.beBuildVersion;
        this.feBuildVersion = aboutAppData.feVersion;
      }
    });

  }

}
