import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatOptionModule,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatSelectModule } from '@angular/material/select';

import { FormDireccionComponent } from './form-direccion.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    GoogleMapsModule,
    ReactiveFormsModule,
  ],
  declarations: [FormDireccionComponent],
  exports: [FormDireccionComponent],
  entryComponents: [FormDireccionComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class FormDireccionModule {}
