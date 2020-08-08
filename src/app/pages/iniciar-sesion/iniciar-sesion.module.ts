import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { IniciarSesionComponent } from './iniciar-sesion.component';
import { IniciarSesionRoutingModule } from './iniciar-sesion-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    IniciarSesionRoutingModule,
    CommonModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [IniciarSesionComponent],
  providers: [],
})
export class IniciarSesionModule {}
