import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  IEspacio,
  ActionTipo,
  MSGTIME,
  RolTipo,
  IEtiqueta,
  IDialogConfirmBody,
} from 'src/app/interface/interface.model';
import { EspacioService } from 'src/app/services/espacio.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FormEspacioComponent } from 'src/app/dialog/form-espacio/form-espacio.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ConfirmarComponent } from 'src/app/dialog/confirmar/confirmar.component';

@Component({
  selector: 'app-espacio',
  templateUrl: './espacio.component.html',
  styleUrls: ['./espacio.component.styl'],
})
export class EspacioComponent implements OnInit {
  private espacioSubject = new BehaviorSubject<IEspacio>(null);
  espacio = this.espacioSubject.asObservable();
  private loading: boolean = false;
  private id: number = null;

  constructor(
    private authService: AuthenticationService,
    private espacioServ: EspacioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.espacioServ.getEspacio(this.id).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error),
      () => (this.loading = false)
    );
  }

  onSuccess(result: IEspacio) {
    this.espacioSubject.next(result);
    this.loading = false;
  }

  onError(error) {
    this.espacioSubject.next(null);
    this.loading = false;
  }

  onEdit() {
    let espacio = this.espacioSubject.value;
    if (espacio != null) {
      const body = {
          action: ActionTipo.editar,
          data: espacio,
        },
        dialogRef = this.dialog.open(FormEspacioComponent, {
          maxWidth: '550px',
          maxHeight: '100%',
          height: 'auto',
          data: body,
        });
      dialogRef.afterClosed().subscribe((result) => {
        let esp: IEspacio = result;
        if (esp != null) {
          this.espacioServ.actualizarEspacio(esp).subscribe(
            () => {
              this.mostrarMensaje(
                `Se ha editado correctamente el espacio ${esp.nombre}`,
                'success'
              );
              this.ngOnInit();
            },
            () => {
              this.mostrarMensaje(
                `No se ha podido actualizar el espacio ${esp.nombre}`,
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
        subtitulo: 'Está seguro que desea borrar el espacio?',
      },
      dialogRef = this.dialog.open(ConfirmarComponent, {
        data: dataBody,
      });
    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) this.onDelete();
    });
  }

  onDelete() {
    let espacio = this.espacioSubject.value;
    if (espacio != null) {
      this.loading = true;
      this.espacioServ.eliminarEspacio(espacio).subscribe(
        () => {
          this.mostrarMensaje(
            `Se ha dado de baja correctamente al espacio ${espacio.nombre}`,
            'success'
          );
          //this.ngOnInit();
          this.router.navigate(['/espacios']);
        },
        () => {
          this.mostrarMensaje(
            `No se ha podido dar de baja el espacio ${espacio.nombre}`,
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

  agregarEtiqueta(nombreSel: string) {
    let espacio = this.espacioSubject.value;
    if (espacio != null) {
      let eti: IEtiqueta = {
          id: null,
          nombre: nombreSel,
        },
        etiAux = [...espacio.etiquetas];
      this.loading = true;
      this.espacioServ.agregarEtiqueta(nombreSel, espacio).subscribe(
        () => {
          this.mostrarMensaje(
            `Se ha agregado la etiqueta ${nombreSel}`,
            'success'
          );
          this.ngOnInit();
        },
        () => {
          this.mostrarMensaje(
            `No se ha podido agregar la etiqueta ${nombreSel}`,
            'error'
          );
          espacio.etiquetas = etiAux;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  eliminarEtiqueta(etiqueta: IEtiqueta) {
    let espacio = this.espacioSubject.value;
    if (espacio != null) {
      espacio.etiquetas = espacio.etiquetas.filter((e) => e.id != etiqueta.id);
      this.loading = true;
      this.espacioServ.actualizarEspacio(espacio).subscribe(
        () => {
          this.mostrarMensaje(`Se ha eliminado la etiqueta`, 'success');
          this.ngOnInit();
        },
        () => {
          this.mostrarMensaje(`No se ha podido eliminar la etiqueta`, 'error');
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
