import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IDireccion } from 'src/app/interface/interface.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-direccion',
  templateUrl: './form-direccion.component.html',
  styleUrls: ['./form-direccion.component.styl'],
})
export class FormDireccionComponent {
  direccionForm: FormGroup = new FormGroup({
    calle: new FormControl(''),
    ciudad: new FormControl(''),
    estado: new FormControl(''),
    cp: new FormControl(''),
    latitud: new FormControl(''),
    longitud: new FormControl(''),
  });
  direccion: IDireccion;
  // Configuración de Google Maps
  //center = { lat: 24, lng: 12 };
  //zoom = 15;
  //display?: google.maps.LatLngLiteral;

  constructor(
    public dialogRef: MatDialogRef<FormDireccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDireccion
  ) {
    this.direccionForm = new FormGroup({
      calle: new FormControl(''),
      ciudad: new FormControl(''),
      estado: new FormControl(''),
      cp: new FormControl(''),
      latitud: new FormControl(''),
      longitud: new FormControl(''),
    });
    this.direccion = data;
    if (this.direccion != null) {
      this.crearDireccionForm.calle.setValue(this.direccion.calle);
      this.crearDireccionForm.ciudad.setValue(this.direccion.ciudad);
      this.crearDireccionForm.estado.setValue(this.direccion.estado);
      this.crearDireccionForm.cp.setValue(this.direccion.cp);
      this.crearDireccionForm.latitud.setValue(this.direccion.latitud);
      this.crearDireccionForm.longitud.setValue(this.direccion.longitud);
    }
  }

  onSubmit() {
    this.dialogRef.close(this.direccionForm.value);
  }

  clean() {
    this.direccionForm.reset();
  }

  get crearDireccionForm() {
    return this.direccionForm.controls;
  }
}
