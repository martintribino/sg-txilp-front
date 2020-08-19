import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import {
  IActividad,
  ActionTipo,
  IDialogBody,
  IEspacio,
  EspacioEstadoTipo,
} from "src/app/interface/interface.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-form-espacio",
  templateUrl: "./form-espacio.component.html",
  styleUrls: ["./form-espacio.component.styl"],
})
export class FormEspacioComponent {
  espacioForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    descripcion: new FormControl(""),
    desde: new FormControl(null),
    hasta: new FormControl(null),
  });
  espacio: IEspacio = null;
  private action: ActionTipo;
  private tipos: Array<{ indice: string; value: string }> = [];
  private tipoSelected: string = "";

  constructor(
    public dialogRef: MatDialogRef<FormEspacioComponent>,
    @Inject(MAT_DIALOG_DATA) public body: IDialogBody<IEspacio>
  ) {
    this.espacioForm = new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl(""),
      descripcion: new FormControl(""),
      capacidad: new FormControl(0),
      condicion: new FormControl(null),
    });
    this.tipos = [];
    Object.keys(EspacioEstadoTipo).map((ind) =>
      this.tipos.push({ indice: EspacioEstadoTipo[ind] as string, value: ind })
    );
    this.espacio = body.data;
    this.action = body.action;
    this.crearEspacioForm.id.setValue(this.espacio.id);
    this.crearEspacioForm.nombre.setValue(this.espacio.nombre);
    this.crearEspacioForm.descripcion.setValue(this.espacio.descripcion);
    this.crearEspacioForm.capacidad.setValue(this.espacio.capacidad);
    this.crearEspacioForm.condicion.setValue(this.espacio.condicion);
  }

  onSubmit() {
    this.dialogRef.close(this.espacioForm.value);
  }

  clean() {
    this.espacioForm.reset();
  }

  get crearEspacioForm() {
    return this.espacioForm.controls;
  }
}
