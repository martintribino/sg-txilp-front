import { Component, OnInit, Inject } from '@angular/core';
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
    hasta: new FormControl(null),
  });
  actividad: IActividad = null;
  private action: ActionTipo;
  minDate: Date = new Date();
  private espaciosSubject = new BehaviorSubject<Array<IEspacio>>([]);
  espaciosObs = this.espaciosSubject.asObservable();
  private obrasSubject = new BehaviorSubject<Array<IObra>>([]);
  obrasObs = this.obrasSubject.asObservable();
  private edicionesSubject = new BehaviorSubject<Array<IEdicion>>([]);
  edicionesObs = this.edicionesSubject.asObservable();

  constructor(
    public dialogRef: MatDialogRef<FormActividadComponent>,
    private obraServ: ObraService,
    private edicionServ: EdicionService,
    private espacioServ: EspacioService,
    @Inject(MAT_DIALOG_DATA) public body: IDialogBody<IActividad>
  ) {
    let validators: ValidatorFn[] = [Validators.min(0)];
    if (this.actividad != null && this.actividad.espacio != null) {
      validators.push(Validators.max(this.actividad.espacio.capacidad));
    }
    this.actividadForm = new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      desde: new FormControl(null),
      hasta: new FormControl(null),
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
    this.crearActividadForm.desde.setValue(new Date(this.actividad.desde));
    this.crearActividadForm.hasta.setValue(new Date(this.actividad.hasta));
    this.crearActividadForm.entradasVendidas.setValue(
      this.actividad.entradasVendidas
    );
    this.crearActividadForm.obra.setValue(this.actividad.obra);
    this.crearActividadForm.espacio.setValue(this.actividad.espacio);
    this.crearActividadForm.edicion.setValue(this.actividad.edicion);
    this.edicionServ.getEdiciones().subscribe(
      (data) => {
        this.edicionesSubject.next(data);
      },
      (error) => {
        this.edicionesSubject.next([]);
      }
    );
    this.espacioServ.getEspacios().subscribe(
      (data) => {
        this.espaciosSubject.next(data);
      },
      (error) => {
        this.espaciosSubject.next([]);
      }
    );
    this.obraServ.getObras().subscribe(
      (data) => {
        this.obrasSubject.next(data);
      },
      (error) => {
        this.obrasSubject.next([]);
      }
    );
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

  compare(a1, a2) {
    return a1 != null && a2 != null && a1.id == a2.id ? a1 : null;
  }
}
