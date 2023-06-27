import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { Store } from '@ngrx/store';
import { UserAuthService } from 'src/app/services/user/user-auth.service';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { getAboutApp } from 'src/app/store/actions/about-page/about-page.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  elem: any;
  isFullScreen: boolean = false;
  isMenuOpened: boolean = false;
  modalIsOpen: boolean = false;

  constructor(private router: Router,
    @Inject(DOCUMENT) public document: any,
    private dialogRef: MatDialog,
    private store: Store,
    private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.chkScreenMode();
    this.elem = document.documentElement;
  }

  public goToHome() {
    this.router.navigate(['/home-page']);
  }

  @HostListener('document:fullscreenchange', ['$event'])
  fullscreenmodes(event: any) {
    return this.chkScreenMode();
  }
  chkScreenMode() {
    if (document.fullscreenElement) {
      this.isFullScreen = true;
    } else {
      this.isFullScreen = false;
    }
  }
  openFullScreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    }
  }

  closeFullScreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    }
  }

  toggleMenu(toggle: boolean): void {
    this.isMenuOpened = toggle;
  }

  openDialog(mode: string) {
    if (mode === 'addUser') {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "35%";
      dialogConfig.disableClose = true;
      this.dialogRef.open(AddNewUserComponent, dialogConfig)
    }
    if (mode === 'about') {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      dialogConfig.disableClose = true;
      dialogConfig.data = {
        name: "About Safe Driving",
      }
      this.store.dispatch(getAboutApp());
      this.dialogRef.open(PopUpComponent, dialogConfig)

    }
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }
}
