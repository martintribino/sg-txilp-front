import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { FormArtistaComponent } from './form-artista.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [],
  exports: [],
  entryComponents: [FormArtistaComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class FormArtistaModule {}
