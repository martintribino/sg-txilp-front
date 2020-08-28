import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  IActividad,
  ActionTipo,
  IDialogBody,
  IEspacio,
  EspacioEstadoTipo,
  IDireccion,
  ICoordinadas,
} from 'src/app/interface/interface.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { regexPostal } from 'src/app/helpers/constants';

@Component({
  selector: 'app-form-espacio',
  templateUrl: './form-espacio.component.html',
  styleUrls: ['./form-espacio.component.styl'],
})
export class FormEspacioComponent {
  espacioForm: FormGroup;
  espacio: IEspacio = null;
  direccion: IDireccion = null;
  private action: ActionTipo;
  tipos: Array<{ indice: string; value: string }> = [];
  private tipoSelected: string = '';

  constructor(
    public dialogRef: MatDialogRef<FormEspacioComponent>,
    @Inject(MAT_DIALOG_DATA) public body: IDialogBody<IEspacio>
  ) {
    this.espacioForm = new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      capacidad: new FormControl(0),
      condicion: new FormControl(null),
      direccion: new FormGroup({
        id: new FormControl(null),
        calle: new FormControl(''),
        ciudad: new FormControl(''),
        estado: new FormControl(''),
        codigoPostal: new FormControl(null),
        latitud: new FormControl(0),
        longitud: new FormControl(0),
      }),
    });
    this.tipos = [];
    Object.keys(EspacioEstadoTipo).map((ind) =>
      this.tipos.push({ indice: EspacioEstadoTipo[ind] as string, value: ind })
    );
    this.espacio = body.data;
    this.action = body.action;
    if (this.espacio.direccion == null) {
      this.espacio.direccion = {
        id: null,
        calle: '',
        ciudad: '',
        estado: '',
        codigoPostal: 0,
        latitud: 0,
        longitud: 0,
      };
    }
    this.espacioForm = new FormGroup({
      id: new FormControl(this.espacio.id),
      nombre: new FormControl(this.espacio.nombre),
      descripcion: new FormControl(this.espacio.descripcion),
      capacidad: new FormControl(this.espacio.capacidad, [Validators.min(0)]),
      condicion: new FormControl(this.espacio.condicion),
      direccion: new FormGroup({
        id: new FormControl(this.espacio.direccion.id),
        calle: new FormControl(this.espacio.direccion.calle),
        ciudad: new FormControl(this.espacio.direccion.ciudad),
        estado: new FormControl(this.espacio.direccion.estado),
        codigoPostal: new FormControl(this.espacio.direccion.codigoPostal, [
          Validators.min(0),
          Validators.pattern(regexPostal),
        ]),
        latitud: new FormControl(this.espacio.direccion.latitud),
        longitud: new FormControl(this.espacio.direccion.longitud),
      }),
    });
  }

  onSubmit() {
    this.dialogRef.close(this.espacioForm.value);
  }

  onClickMap(coordinadas: ICoordinadas) {
    this.direccionForm.latitud.setValue(coordinadas.latitud);
    this.direccionForm.longitud.setValue(coordinadas.longitud);
  }

  clean() {
    this.espacioForm.reset();
  }

  get getEspacioForm() {
    return this.espacioForm.controls;
  }

  get direccionForm() {
    return (this.espacioForm.get('direccion') as FormGroup).controls;
  }
}
