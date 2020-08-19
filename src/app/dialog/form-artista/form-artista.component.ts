import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import {
  IArtista,
  ActionTipo,
  IDialogBody,
} from "src/app/interface/interface.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-form-artista",
  templateUrl: "./form-artista.component.html",
  styleUrls: ["./form-artista.component.styl"],
})
export class FormArtistaComponent {
  artistaForm: FormGroup = new FormGroup({
    id: new FormControl(""),
    nombre: new FormControl(""),
    apellido: new FormControl(""),
    apodo: new FormControl(""),
  });
  artista: IArtista = null;
  private action: ActionTipo;

  constructor(
    public dialogRef: MatDialogRef<FormArtistaComponent>,
    @Inject(MAT_DIALOG_DATA) public body: IDialogBody<IArtista>
  ) {
    this.artistaForm = new FormGroup({
      id: new FormControl(""),
      nombre: new FormControl(""),
      apellido: new FormControl(""),
      apodo: new FormControl(""),
    });
    this.artista = body.data;
    this.action = body.action;
    this.crearArtistaForm.id.setValue(this.artista.id);
    this.crearArtistaForm.nombre.setValue(this.artista.nombre);
    this.crearArtistaForm.apellido.setValue(this.artista.apellido);
    this.crearArtistaForm.apodo.setValue(this.artista.apodo);
  }

  onSubmit() {
    this.dialogRef.close(this.artistaForm.value);
  }

  clean() {
    this.artistaForm.reset();
  }

  get crearArtistaForm() {
    return this.artistaForm.controls;
  }
}
