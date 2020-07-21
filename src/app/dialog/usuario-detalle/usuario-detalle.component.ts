import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUsuario } from 'src/app/interface/interface.model';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.styl'],
})
export class UsuarioDetalleComponent {
  usuario: IUsuario;

  constructor(
    public dialogRef: MatDialogRef<UsuarioDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUsuario
  ) {
    this.usuario = data;
  }
}
