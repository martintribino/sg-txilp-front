import { Component, OnInit } from '@angular/core';
import {
  IActividad,
  ActionTipo,
  MSGTIME,
  RolTipo,
  IEspacio,
  IObra,
  IEdicion,
  IDialogConfirmBody,
} from 'src/app/interface/interface.model';
import { BehaviorSubject } from 'rxjs';
import { ActividadService } from 'src/app/services/actividad.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { FormActividadComponent } from 'src/app/dialog/form-actividad/form-actividad.component';
import { EdicionService } from 'src/app/services/edicion.service';
import { EspacioService } from 'src/app/services/espacio.service';
import { ObraService } from 'src/app/services/obra.service';
import { ConfirmarComponent } from 'src/app/dialog/confirmar/confirmar.component';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.styl'],
})
export class ActividadComponent implements OnInit {
  private actividadSubject = new BehaviorSubject<IActividad>(null);
  actividad = this.actividadSubject.asObservable();
  private espaciosSubject = new BehaviorSubject<Array<IEspacio>>([]);
  private obrasSubject = new BehaviorSubject<Array<IObra>>([]);
  private edicionesSubject = new BehaviorSubject<Array<IEdicion>>([]);
  private loading: boolean = false;
  private id: number = null;

  constructor(
    private authService: AuthenticationService,
    private actividadServ: ActividadService,
    private edicionServ: EdicionService,
    private espacioServ: EspacioService,
    private obraServ: ObraService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
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

  ngOnInit(): void {
    this.loading = true;
    this.actividadServ.getActividad(this.id).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error),
      () => (this.loading = false)
    );
  }

  onSuccess(result: IActividad) {
    this.actividadSubject.next(result);
    this.loading = false;
  }

  onError(error) {
    this.actividadSubject.next(null);
    this.loading = false;
  }

  onEdit() {
    let activ = this.actividadSubject.value;
    if (activ != null) {
      const body = {
          action: ActionTipo.editar,
          ediciones: this.edicionesSubject.value,
          espacios: this.espaciosSubject.value,
          obras: this.obrasSubject.value,
          data: activ,
        },
        dialogRef = this.dialog.open(FormActividadComponent, {
          maxWidth: '550px',
          maxHeight: '100%',
          height: 'auto',
          data: body,
        });
      dialogRef.afterClosed().subscribe((result) => {
        let act: IActividad = result;
        if (act != null) {
          this.actividadServ.actualizarActividad(act).subscribe(
            () => {
              this.mostrarMensaje(
                `Se ha editado correctamente la actividad ${act.nombre}`,
                'success'
              );
              this.ngOnInit();
            },
            () => {
              this.mostrarMensaje(
                `No se ha podido actualizar la actividad ${act.nombre}`,
                'error'
              );
            }
          );
        }
      });
    }
  }

  onConfirmDelete() {
    const dataBody: IDialogConfirmBody = {
        titulo: 'Confirmar Borrado',
        subtitulo: 'Está seguro que desea borrar la actividad?',
      },
      dialogRef = this.dialog.open(ConfirmarComponent, {
        data: dataBody,
      });
    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) this.onDelete();
    });
  }

  onDelete() {
    let act = this.actividadSubject.value;
    if (act != null) {
      this.loading = true;
      this.actividadServ.eliminarActividad(act).subscribe(
        () => {
          this.mostrarMensaje(
            `Se ha dado de baja correctamente la actividad ${act.nombre}`,
            'success'
          );
          this.router.navigate(['/actividades']);
        },
        () => {
          this.mostrarMensaje(
            `No se ha podido dar de baja la actividad ${act.nombre}`,
            'error'
          );
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  private mostrarMensaje(
    strError: string,
    clase: string = '',
    time: number = MSGTIME,
    pos: MatSnackBarVerticalPosition = 'bottom'
  ) {
    this.snackBar.open(strError, '', {
      duration: time,
      verticalPosition: pos,
      panelClass: clase,
    });
  }

  isAdmin() {
    let usuario = this.authService.getUsuario();
    return usuario != null && usuario.rol == RolTipo.Administrador;
  }
}
