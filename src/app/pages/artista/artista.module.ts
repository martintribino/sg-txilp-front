import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistaComponent } from './artista.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ArtistaRoutingModule } from './artista-routing.module';
import { CarruselImagenesModule } from 'src/app/shared/carrusel-imagenes/carrusel-imagenes.module';
import { EtiquetasEntidadModule } from 'src/app/shared/etiquetas-entidad/etiquetas-entidad.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    ArtistaRoutingModule,
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
    MatSliderModule,
  ],
  declarations: [ArtistaComponent],
  providers: [],
})
export class ArtistaModule {}
