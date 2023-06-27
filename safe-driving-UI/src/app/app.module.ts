import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './base-components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PopUpComponent } from './base-components/pop-up/pop-up.component';
import { HomePageComponent } from './base-components/home-page/home-page.component';
import { UserProfileComponent } from './base-components/user-profile/user-profile.component';
import { AccidentCasesComponent } from './base-components/accident-cases/accident-cases.component';
import { CoverageMapsComponent } from './base-components/coverage-maps/coverage-maps.component';
import { AccidentCasesMenuComponent } from './base-components/accident-cases-menu/accident-cases-menu.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { HttpService } from './services/http.service';
import { accidentCasesFeatureKey, accidentCasesStateReducer } from './store/reducers/accident-cases/accident-cases.reducers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AccidentCasesEffects } from './store/effects/accident-cases/accident-cases.effect';
import { AccidentDetailsComponent } from './base-components/accident-details/accident-details.component';
import { LoginPageComponent } from './base-components/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { userFeatureKey, userStateReducer } from './store/reducers/user/user.reducer';
import { UserEffects } from './store/effects/user/user.effects';
import { UsersetingsService } from './services/user/usersetings.service';
import { carTestFeatureKey, carTestStateReducer } from './store/reducers/car-test/car-test.reducers';
import { CarTestEffects } from './store/effects/car-test/car-test.effect';
import { AuthGuard } from './services/_auth/auth.guard';
import { UserService } from './services/user/user.service';
import { UserRestrictionsPageComponent } from './base-components/user-restrictions-page/user-restrictions-page.component';
import { ForbiddenPageComponent } from './base-components/forbidden-page/forbidden-page.component';
import { AuthInterceptor } from './services/_auth/auth.interceptor';
import { AddNewUserComponent } from './base-components/add-new-user/add-new-user.component';
import { aboutAppFeatureKey, aboutAppReducer } from './store/reducers/about-page/about-page.reducer';
import { AboutPageEffects } from './store/effects/about-page/about-page.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AccidentDetailsGraphicsComponent } from './base-components/accident-details-graphics/accident-details-graphics.component';
import { TestCarPageModule } from './base-components/test-car-page/test-car-page.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PopUpComponent,
    HomePageComponent,
    UserProfileComponent,
    AccidentCasesComponent,
    CoverageMapsComponent,
    AccidentCasesMenuComponent,
    AccidentDetailsComponent,
    LoginPageComponent,
    UserRestrictionsPageComponent,
    ForbiddenPageComponent,
    AddNewUserComponent,
    AccidentDetailsGraphicsComponent,
    
  ],
  imports: [
    TestCarPageModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSnackBarModule,
    FormsModule,
    StoreModule.forRoot(
      {
          [userFeatureKey]: userStateReducer,
          [accidentCasesFeatureKey]: accidentCasesStateReducer,
          [carTestFeatureKey]: carTestStateReducer,
          [aboutAppFeatureKey]: aboutAppReducer,
      },
      {}
  ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
  }),
  EffectsModule.forRoot([
    UserEffects,
    AccidentCasesEffects,
    CarTestEffects,
    AboutPageEffects,
]),
  ],
  providers: [
    HttpService,
    UsersetingsService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService
    
],
  bootstrap: [AppComponent],
  entryComponents:[PopUpComponent]
})
export class AppModule { }
