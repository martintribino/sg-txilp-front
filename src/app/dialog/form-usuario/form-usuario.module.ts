import { NgModule } from '@angular/core';
import { FormUsuarioComponent } from './form-usuario.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [],
  exports: [],
  entryComponents: [FormUsuarioComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class FormUsuarioModule {}
