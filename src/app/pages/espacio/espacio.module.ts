import { NgModule } from '@angular/core';
import { EspacioRoutingModule } from './espacio-routing.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EspacioComponent } from './espacio.component';
import { CarruselImagenesModule } from 'src/app/shared/carrusel-imagenes/carrusel-imagenes.module';
import { EtiquetasEntidadModule } from 'src/app/shared/etiquetas-entidad/etiquetas-entidad.module';

@NgModule({
  imports: [
    EspacioRoutingModule,
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
  ],
  declarations: [EspacioComponent],
  providers: [],
})
export class EspacioModule {}
