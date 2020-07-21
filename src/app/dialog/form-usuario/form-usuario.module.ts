import { NgModule } from '@angular/core';
import { FormUsuarioComponent } from './form-usuario.component';
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
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

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
    ReactiveFormsModule,
  ],
  declarations: [FormUsuarioComponent],
  exports: [FormUsuarioComponent],
  entryComponents: [FormUsuarioComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class FormUsuarioModule {}
