import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ObraRoutingModule } from './obra-routing.module';
import { ObraComponent } from './obra.component';
import { CarruselImagenesModule } from 'src/app/shared/carrusel-imagenes/carrusel-imagenes.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EtiquetasEntidadModule } from 'src/app/shared/etiquetas-entidad/etiquetas-entidad.module';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  imports: [
    ObraRoutingModule,
    CarruselImagenesModule,
    EtiquetasEntidadModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
  ],
  declarations: [ObraComponent],
  providers: [],
})
export class ObraModule {}
