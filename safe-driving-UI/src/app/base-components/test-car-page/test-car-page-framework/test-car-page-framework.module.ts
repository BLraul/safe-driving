import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestCarPageHeaderComponent } from './test-car-page-header/test-car-page-header.component';
import { TestCarPageSidebarComponent } from './test-car-page-sidebar/test-car-page-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TestCarPageHeaderComponent,
    TestCarPageSidebarComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatRadioModule,
    FormsModule
  ],
  exports: [
    TestCarPageHeaderComponent,
    TestCarPageSidebarComponent,
  ],
})
export class TestCarPageFrameworkModule { }
