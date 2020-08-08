import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioDetalleComponent } from './usuario-detalle.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [CommonModule, MatCardModule],
  declarations: [],
  exports: [],
  entryComponents: [UsuarioDetalleComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class UsuarioDetalleModule {}
