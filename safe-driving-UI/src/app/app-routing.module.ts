import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccidentCasesComponent } from './base-components/accident-cases/accident-cases.component';
import { AccidentDetailsComponent } from './base-components/accident-details/accident-details.component';
import { ForbiddenPageComponent } from './base-components/forbidden-page/forbidden-page.component';
import { HomePageComponent } from './base-components/home-page/home-page.component';
import { LoginPageComponent } from './base-components/login-page/login-page.component';
import { UserRestrictionsPageComponent } from './base-components/user-restrictions-page/user-restrictions-page.component';
import { AuthGuard } from './services/_auth/auth.guard';

export const LOGIN_PAGE_ROUTE = 'login-page';

const routes: Routes = [
  { path: '', redirectTo: 'login-page', pathMatch: 'full' },
  { path: 'home-page',component: HomePageComponent, canActivate:[AuthGuard], data:{roles:['Admin','User']}},
  { path: 'user-page',component: UserRestrictionsPageComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  {
    path: 'accident-cases',
    component: AccidentCasesComponent,
  },
  {
    path: 'forbidden-page',
    component: ForbiddenPageComponent,
  },
  {
    path: 'accident-details/:caseId',
    pathMatch: 'full',
    component: AccidentDetailsComponent,
    canActivate:[AuthGuard], data:{roles:['Admin']}
  },
  {
    path: 'test-car-page',
    loadChildren: () => import('./base-components/test-car-page/test-car-page.module').then(m =>m.TestCarPageModule),
    canActivate:[AuthGuard], data:{roles:['Admin']}
   },
  {
    path: 'login-page',
    pathMatch: 'full',
    component: LoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
