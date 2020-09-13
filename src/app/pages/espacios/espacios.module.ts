import { NgModule } from '@angular/core';

import { EspaciosComponent } from './espacios.component';
import { EspaciosRoutingModule } from './espacios-routing.module';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltroTablaModule } from 'src/app/shared/filtro-tabla/filtro-tabla.module';

@NgModule({
  imports: [
    EspaciosRoutingModule,
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
  declarations: [EspaciosComponent],
  providers: [],
})
export class EspaciosModule {}
