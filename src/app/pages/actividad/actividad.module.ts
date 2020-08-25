import { NgModule } from '@angular/core';
import { ActividadRoutingModule } from './actividad-routing.module';
import { CarruselImagenesModule } from 'src/app/shared/carrusel-imagenes/carrusel-imagenes.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActividadComponent } from './actividad.component';

@NgModule({
  imports: [
    ActividadRoutingModule,
    CarruselImagenesModule,
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
  declarations: [ActividadComponent],
  providers: [],
})
export class ActividadModule {}
