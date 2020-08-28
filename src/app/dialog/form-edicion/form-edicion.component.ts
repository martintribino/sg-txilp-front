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
  minDate: Date = new Date();
  private actividadesSubject = new BehaviorSubject<Array<IActividad>>([]);
  actividadesObs = this.actividadesSubject.asObservable();

  constructor(
    public dialogRef: MatDialogRef<FormEdicionComponent>,
    private actividadServ: ActividadService,
    @Inject(MAT_DIALOG_DATA) public body: IDialogBody<IEdicion>
  ) {
    this.edicionForm = new FormGroup({
      id: new FormControl(null),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      desde: new FormControl(null),
      hasta: new FormControl(null),
      actividades: new FormControl([]),
      fotos: new FormControl([]),
    });
    this.edicion = body.data;
    this.action = body.action;
    this.crearEdicionForm.id.setValue(this.edicion.id);
    this.crearEdicionForm.nombre.setValue(this.edicion.nombre);
    this.crearEdicionForm.descripcion.setValue(this.edicion.descripcion);
    this.crearEdicionForm.desde.setValue(new Date(this.edicion.desde));
    this.crearEdicionForm.hasta.setValue(new Date(this.edicion.hasta));
    this.crearEdicionForm.actividades.setValue(this.edicion.actividades);
    this.crearEdicionForm.fotos.setValue(this.edicion.fotos);
    this.actividadServ.getActividades().subscribe(
      (data) => {
        this.actividadesSubject.next(data);
        this.crearEdicionForm.actividades.setValue(this.edicion.actividades);
      },
      (error) => {
        this.actividadesSubject.next([]);
      }
    );
  }

  onSubmit() {
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
