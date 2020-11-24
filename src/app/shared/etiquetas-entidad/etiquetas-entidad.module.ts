import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtiquetasEntidadComponent } from './etiquetas-entidad.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
  ],
  declarations: [EtiquetasEntidadComponent],
  exports: [EtiquetasEntidadComponent],
  entryComponents: [EtiquetasEntidadComponent],
  providers: [],
})
export class EtiquetasEntidadModule {}
