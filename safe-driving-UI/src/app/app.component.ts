import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { getUserDetails } from './store/actions/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'safe-driving-UI';
  isLogin: boolean;

  constructor ( private router: Router, private store: Store) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login-page') {
          this.isLogin= true;
        } else {
          this.isLogin= false;
        }
      }
    });
  }
 
ngOnInit() {
        Promise.resolve().then(() => {
            this.getUserDetailsAndRedirectToHomePage();
        });
}
private getUserDetailsAndRedirectToHomePage(): void {
    if (!!environment.useMockData) {
        this.store.dispatch(getUserDetails());
    }
}
}
