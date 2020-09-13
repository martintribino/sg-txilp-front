import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ShowOnDirtyErrorStateMatcher,
  ErrorStateMatcher,
  MatOptionModule,
} from '@angular/material/core';
import { FiltroTablaComponent } from './filtro-tabla.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [FiltroTablaComponent],
  exports: [FiltroTablaComponent],
  entryComponents: [FiltroTablaComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class FiltroTablaModule {}
