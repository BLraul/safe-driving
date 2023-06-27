import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestCarPageComponent } from './test-car-page.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';


import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProgramingTestCarComponent } from './programing-test-car/programing-test-car.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { CarAdditionNotificationComponent } from './notifications/car-addition-notification/car-addition-notification.component';
import { CarDeletionNotificationComponent } from './notifications/car-deletion-notification/car-deletion-notification.component';
import { CarUpdateNotificationComponent } from './notifications/car-update-notification/car-update-notification.component';
import { NotificationCreateAppointmentComponent } from './notifications/notification-create-appointment/notification-create-appointment.component';
import { NotificationDeleteAppointmentComponent } from './notifications/notification-delete-appointment/notification-delete-appointment.component';
import { EmailNotificationSentComponent } from './notifications/email-notification-sent/email-notification-sent.component';
import { ViewAllCarsComponent } from './view-all-cars/view-all-cars.component';
import { CreateTestCarComponent } from './create-test-car/create-test-car.component';
import { ViewAllCarsByCategoryComponent } from './view-all-cars-by-category/view-all-cars-by-category.component';
import { DeleteTestCarComponent } from './delete-test-car/delete-test-car.component';
import { UpdateTestCarComponent } from './update-test-car/update-test-car.component';
import { ViewCarComponent } from './view-car/view-car.component';
import { DisplayTestCarProgramComponent } from './display-test-car-program/display-test-car-program.component';
import { TestCarPageRoutingModule } from './test-car-page-routing.module';
import { TestCarPageFrameworkModule } from './test-car-page-framework/test-car-page-framework.module';

@NgModule({
  declarations: [
    TestCarPageComponent,
    ViewAllCarsComponent,
    CreateTestCarComponent,
    ViewAllCarsByCategoryComponent,
    DeleteTestCarComponent,
    UpdateTestCarComponent,
    ViewCarComponent,
    CarAdditionNotificationComponent,
    CarDeletionNotificationComponent,
    CarUpdateNotificationComponent,
    ProgramingTestCarComponent,
    DisplayTestCarProgramComponent,
    NotificationCreateAppointmentComponent,
    NotificationDeleteAppointmentComponent,
    EmailNotificationSentComponent
  ],
  imports: [
    CommonModule,
    TestCarPageRoutingModule,
    TestCarPageFrameworkModule,
    MatSidenavModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,  
    MatToolbarModule,
    MatTableModule

  ],
})
export class TestCarPageModule { }
