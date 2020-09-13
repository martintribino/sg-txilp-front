import { NgModule } from '@angular/core';

import { ArtistasComponent } from './artistas.component';
import { ArtistasRoutingModule } from './artistas-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { FiltroTablaModule } from 'src/app/shared/filtro-tabla/filtro-tabla.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ArtistasRoutingModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    FiltroTablaModule,
  ],
  declarations: [ArtistasComponent],
  providers: [],
})
export class ArtistasModule {}
