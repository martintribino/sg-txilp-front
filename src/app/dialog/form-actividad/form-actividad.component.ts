import { Component, OnInit, Inject, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import {
  IActividad,
  ActionTipo,
  IDialogBody,
  IEspacio,
  IObra,
  IEdicion,
} from 'src/app/interface/interface.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EspacioService } from 'src/app/services/espacio.service';
import { BehaviorSubject } from 'rxjs';
import { ObraService } from 'src/app/services/obra.service';
import { EdicionService } from 'src/app/services/edicion.service';

@Component({
  selector: 'app-form-actividad',
  templateUrl: './form-actividad.component.html',
  styleUrls: ['./form-actividad.component.styl'],
})
export class FormActividadComponent {
  actividadForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    desde: new FormControl(null),
    desdeTime: new FormControl(''),
    hasta: new FormControl(null),
    hastaTime: new FormControl(''),
  });
  actividad: IActividad = null;
  private action: ActionTipo;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  ediciones: Array<IEdicion>;
  espacios: Array<IEspacio>;
  obras: Array<IObra>;
  edicionSelected: IEdicion;

  constructor(
    public dialogRef: MatDialogRef<FormActividadComponent>,
    @Inject(MAT_DIALOG_DATA) public body: IDialogBody<IActividad>
  ) {
    let validators: ValidatorFn[] = [Validators.min(0)];
    if (this.actividad != null && this.actividad.espacio != null) {
      validators.push(Validators.max(this.actividad.espacio.capacidad));
    }
    this.edicionSelected = null;
    this.ediciones = body.ediciones;
    this.espacios = body.espacios;
    this.obras = body.obras;
    this.actividadForm = new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      desde: new FormControl(new Date()),
      desdeTime: new FormControl(''),
      hasta: new FormControl(new Date()),
      hastaTime: new FormControl(''),
      entradasVendidas: new FormControl(0, validators),
      obra: new FormControl(null),
      espacio: new FormControl(null),
      edicion: new FormControl(null),
    });
    this.actividad = body.data;
    this.action = body.action;
    this.crearActividadForm.id.setValue(this.actividad.id);
    this.crearActividadForm.nombre.setValue(this.actividad.nombre);
    this.crearActividadForm.descripcion.setValue(this.actividad.descripcion);
    let desdeDate: Date = new Date(this.actividad.desde),
      desdeT: string = `${String(desdeDate.getHours()).padStart(
        2,
        '0'
      )}:${String(desdeDate.getMinutes()).padStart(2, '0')}`;
    this.crearActividadForm.desde.setValue(desdeDate);
    this.crearActividadForm.desdeTime.setValue(desdeT);
    let hastaDate: Date = new Date(this.actividad.hasta),
      hastaT: string = `${String(hastaDate.getHours()).padStart(
        2,
        '0'
      )}:${String(hastaDate.getMinutes()).padStart(2, '0')}`;
    this.crearActividadForm.hasta.setValue(hastaDate);
    this.crearActividadForm.hastaTime.setValue(hastaT);
    this.crearActividadForm.entradasVendidas.setValue(
      this.actividad.entradasVendidas
    );
    this.crearActividadForm.obra.setValue(this.actividad.obra);
    this.crearActividadForm.espacio.setValue(this.actividad.espacio);
    this.crearActividadForm.edicion.setValue(this.actividad.edicion);
  }

  onSubmit() {
    try {
      let desde: Date = this.getDesde(),
        hasta: Date = this.getHasta();
      this.crearActividadForm.desde.setValue(desde);
      this.crearActividadForm.hasta.setValue(hasta);
      this.actividadForm.removeControl('desdeTime');
      this.actividadForm.removeControl('hastaTime');
    } catch (error) {
      console.log('Error manejando tiempo y fechas');
      console.log(error);
    }
    this.dialogRef.close(this.actividadForm.value);
  }

  clean() {
    this.actividadForm.reset();
  }

  get crearActividadForm() {
    return this.actividadForm.controls;
  }

  getHasta() {
    let hasta: Date = this.crearActividadForm.hasta.value,
      hastaT: Array<string> = this.crearActividadForm.hastaTime.value.split(
        ':'
      ),
      hastaHora: number = parseInt(hastaT[0]),
      hastaMin: number = parseInt(hastaT[1]);
    hasta.setHours(hastaHora, hastaMin);
    return hasta;
  }

  getDesde() {
    let desde: Date = this.crearActividadForm.desde.value,
      desdeT: Array<string> = this.crearActividadForm.desdeTime.value.split(
        ':'
      ),
      desdeHora: number = parseInt(desdeT[0]),
      desdeMin: number = parseInt(desdeT[1]);
    desde.setHours(desdeHora, desdeMin);
    return desde;
  }

  compare(a1, a2) {
    return a1 != null && a2 != null && a1.id == a2.id ? a1 : null;
  }
}
