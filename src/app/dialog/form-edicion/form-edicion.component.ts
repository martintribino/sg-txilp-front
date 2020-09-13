import { Component, OnInit, Inject } from '@angular/core';
import {
  IEdicion,
  IActividad,
  ActionTipo,
  IDialogBody,
} from 'src/app/interface/interface.model';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-form-edicion',
  templateUrl: './form-edicion.component.html',
  styleUrls: ['./form-edicion.component.styl'],
})
export class FormEdicionComponent {
  edicionForm: FormGroup;
  edicion: IEdicion = null;
  private action: ActionTipo;

  constructor(
    public dialogRef: MatDialogRef<FormEdicionComponent>,
    private actividadServ: ActividadService,
    @Inject(MAT_DIALOG_DATA) public body: IDialogBody<IEdicion>
  ) {
    this.edicionForm = new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      desde: new FormControl(new Date()),
      desdeTime: new FormControl(''),
      hasta: new FormControl(new Date()),
      hastaTime: new FormControl(''),
      actividades: new FormControl([]),
      fotos: new FormControl([]),
    });
    this.edicion = body.data;
    this.action = body.action;
    this.crearEdicionForm.id.setValue(this.edicion.id);
    this.crearEdicionForm.nombre.setValue(this.edicion.nombre);
    this.crearEdicionForm.descripcion.setValue(this.edicion.descripcion);
    let desdeDate: Date = new Date(this.edicion.desde),
      desdeT: string = `${String(desdeDate.getHours()).padStart(
        2,
        '0'
      )}:${String(desdeDate.getMinutes()).padStart(2, '0')}`;
    this.crearEdicionForm.desde.setValue(desdeDate);
    this.crearEdicionForm.desdeTime.setValue(desdeT);
    let hastaDate: Date = new Date(this.edicion.hasta),
      hastaT: string = `${String(hastaDate.getHours()).padStart(
        2,
        '0'
      )}:${String(hastaDate.getMinutes()).padStart(2, '0')}`;
    this.crearEdicionForm.hasta.setValue(hastaDate);
    this.crearEdicionForm.hastaTime.setValue(hastaT);
    this.crearEdicionForm.actividades.setValue(this.edicion.actividades);
    this.crearEdicionForm.fotos.setValue(this.edicion.fotos);
    this.crearEdicionForm.actividades.setValue(this.edicion.actividades);
  }

  onSubmit() {
    try {
      let desde: Date = this.crearEdicionForm.desde.value,
        hasta: Date = this.crearEdicionForm.hasta.value,
        desdeT: Array<string> = this.crearEdicionForm.desdeTime.value.split(
          ':'
        ),
        desdeHora: number = parseInt(desdeT[0]),
        desdeMin: number = parseInt(desdeT[1]),
        hastaT: Array<string> = this.crearEdicionForm.hastaTime.value.split(
          ':'
        ),
        hastaHora: number = parseInt(hastaT[0]),
        hastaMin: number = parseInt(hastaT[1]);
      desde.setHours(desdeHora, desdeMin);
      hasta.setHours(hastaHora, hastaMin);
      this.crearEdicionForm.desde.setValue(desde);
      this.crearEdicionForm.hasta.setValue(hasta);
      this.edicionForm.removeControl('desdeTime');
      this.edicionForm.removeControl('hastaTime');
    } catch (error) {
      console.log('Error manejando tiempo y fechas');
      console.log(error);
    }
    this.dialogRef.close(this.edicionForm.value);
  }

  clean() {
    this.edicionForm.reset();
  }

  get crearEdicionForm() {
    return this.edicionForm.controls;
  }

  compare(a1, a2) {
    return a1 != null && a2 != null && a1.id == a2.id ? a1 : null;
  }
}
