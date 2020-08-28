import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDireccion, ICoordinadas } from 'src/app/interface/interface.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { regexPostal } from 'src/app/helpers/constants';

@Component({
  selector: 'app-form-direccion',
  templateUrl: './form-direccion.component.html',
  styleUrls: ['./form-direccion.component.styl'],
})
export class FormDireccionComponent {
  direccionForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    calle: new FormControl(''),
    ciudad: new FormControl(''),
    estado: new FormControl(''),
    codigoPostal: new FormControl(null, [
      Validators.min(0),
      Validators.pattern(regexPostal),
    ]),
    latitud: new FormControl(null),
    longitud: new FormControl(null),
  });
  direccion: IDireccion;

  constructor(
    public dialogRef: MatDialogRef<FormDireccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDireccion
  ) {
    this.direccionForm = new FormGroup({
      id: new FormControl(null),
      calle: new FormControl(''),
      ciudad: new FormControl(''),
      estado: new FormControl(''),
      codigoPostal: new FormControl(null),
      latitud: new FormControl(0),
      longitud: new FormControl(0),
    });
    this.direccion = data;
    if (this.direccion == null) {
      this.direccion = {
        id: null,
        calle: '',
        ciudad: '',
        estado: '',
        codigoPostal: 0,
        latitud: 0,
        longitud: 0,
      };
    }
    this.crearDireccionForm.id.setValue(this.direccion.id);
    this.crearDireccionForm.calle.setValue(this.direccion.calle);
    this.crearDireccionForm.ciudad.setValue(this.direccion.ciudad);
    this.crearDireccionForm.estado.setValue(this.direccion.estado);
    this.crearDireccionForm.codigoPostal.setValue(this.direccion.codigoPostal);
    this.crearDireccionForm.latitud.setValue(this.direccion.latitud);
    this.crearDireccionForm.longitud.setValue(this.direccion.longitud);
  }

  onSubmit() {
    this.dialogRef.close(this.direccionForm.value);
  }

  onClickMap(coordinadas: ICoordinadas) {
    this.crearDireccionForm.latitud.setValue(coordinadas.latitud);
    this.crearDireccionForm.longitud.setValue(coordinadas.longitud);
  }

  clean() {
    this.direccionForm.reset();
  }

  get crearDireccionForm() {
    return this.direccionForm.controls;
  }
}
