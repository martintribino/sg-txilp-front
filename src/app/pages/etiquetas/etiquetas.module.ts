import { NgModule } from '@angular/core';

import { EtiquetasComponent } from './etiquetas.component';
import { EtiquetasRoutingModule } from './etiquetas-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    EtiquetasRoutingModule,
    CommonModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
  ],
  declarations: [EtiquetasComponent],
  providers: [],
})
export class EtiquetasModule {}
