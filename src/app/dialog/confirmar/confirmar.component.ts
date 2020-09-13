import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormActividadComponent } from '../form-actividad/form-actividad.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogConfirmBody } from 'src/app/interface/interface.model';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.styl'],
})
export class ConfirmarComponent implements OnInit {
  titulo: string;
  subtitulo: string;

  constructor(
    public dialogRef: MatDialogRef<FormActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public body: IDialogConfirmBody
  ) {
    this.titulo = body.titulo;
    this.subtitulo = body.subtitulo;
  }

  ngOnInit(): void {}
}
