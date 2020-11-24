import { NgModule } from '@angular/core';

import { EtiquetasComponent } from './etiquetas.component';
import { EtiquetasRoutingModule } from './etiquetas-routing.module';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EtiquetasEntidadModule } from 'src/app/shared/etiquetas-entidad/etiquetas-entidad.module';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  imports: [
    EtiquetasRoutingModule,
    EtiquetasEntidadModule,
    CommonModule,
    MatInputModule,
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
