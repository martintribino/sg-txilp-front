import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import {
  IActividad,
  ActionTipo,
  IDialogBody,
} from "src/app/interface/interface.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-form-actividad",
  templateUrl: "./form-actividad.component.html",
  styleUrls: ["./form-actividad.component.styl"],
})
export class FormActividadComponent {
  actividadForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    descripcion: new FormControl(""),
    desde: new FormControl(null),
    hasta: new FormControl(null),
  });
  actividad: IActividad = null;
  private action: ActionTipo;
  private minDate: Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<FormActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public body: IDialogBody<IActividad>
  ) {
    this.actividadForm = new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl(""),
      descripcion: new FormControl(""),
      desde: new FormControl(null),
      hasta: new FormControl(null),
      vendidas: new FormControl(0),
      obra: new FormControl(null),
      espacio: new FormControl(null),
      edicion: new FormControl(null),
    });
    this.actividad = body.data;
    this.action = body.action;
    this.crearActividadForm.id.setValue(this.actividad.id);
    this.crearActividadForm.nombre.setValue(this.actividad.nombre);
    this.crearActividadForm.descripcion.setValue(this.actividad.descripcion);
    this.crearActividadForm.desde.setValue(this.actividad.desde);
    this.crearActividadForm.hasta.setValue(this.actividad.hasta);
    this.crearActividadForm.vendidas.setValue(this.actividad.vendidas);
    this.crearActividadForm.obra.setValue(this.actividad.obra);
    this.crearActividadForm.espacio.setValue(this.actividad.espacio);
    this.crearActividadForm.edicion.setValue(this.actividad.edicion);
  }

  onSubmit() {
    this.dialogRef.close(this.actividadForm.value);
  }

  clean() {
    this.actividadForm.reset();
  }

  get crearActividadForm() {
    return this.actividadForm.controls;
  }
}
