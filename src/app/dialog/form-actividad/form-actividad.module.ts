import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormActividadComponent } from './form-actividad.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [],
  exports: [],
  entryComponents: [FormActividadComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class FormActividadModule {}
