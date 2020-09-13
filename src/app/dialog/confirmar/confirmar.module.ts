import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { ConfirmarComponent } from './confirmar.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [],
  exports: [],
  entryComponents: [ConfirmarComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class ConfirmarModule {}
