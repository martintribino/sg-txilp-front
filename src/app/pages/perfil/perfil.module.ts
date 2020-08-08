import { NgModule } from '@angular/core';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    PerfilRoutingModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  declarations: [PerfilComponent],
  providers: [],
})
export class PerfilModule {}
