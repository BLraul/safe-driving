import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

const MaterialComponents = [
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,

  ];

@NgModule({
  exports: [MaterialComponents],
  imports: [MaterialComponents]
})
export class MaterialModule { }
