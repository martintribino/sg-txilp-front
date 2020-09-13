import { Component, OnInit } from '@angular/core';
import {
  IEdicion,
  IDialogBody,
  ActionTipo,
  MSGTIME,
  RolTipo,
  IDialogConfirmBody,
} from 'src/app/interface/interface.model';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth.service';
import { EdicionService } from 'src/app/services/edicion.service';
import { ArchivosService } from 'src/app/services/archivos.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { isArray } from 'util';
import { FormUploadImageComponent } from 'src/app/dialog/form-upload-image/form-upload-image.component';
import { FormEdicionComponent } from 'src/app/dialog/form-edicion/form-edicion.component';
import { EdicionesComponent } from '../ediciones/ediciones.component';
import { ConfirmarComponent } from 'src/app/dialog/confirmar/confirmar.component';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.styl'],
})
export class EdicionComponent implements OnInit {
  private edicionSubject = new BehaviorSubject<IEdicion>(null);
  edicion = this.edicionSubject.asObservable();
  private loading: boolean = false;
  private id: number = null;

  constructor(
    private authService: AuthenticationService,
    private edicionServ: EdicionService,
    private archivoServ: ArchivosService,
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
    this.edicionServ.getEdicion(this.id).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error),
      () => (this.loading = false)
    );
  }

  onSuccess(result: IEdicion) {
    this.edicionSubject.next(result);
    this.loading = false;
  }

  onError(error) {
    this.edicionSubject.next(null);
    this.loading = false;
  }

  getFotos() {
    let ed: IEdicion = this.edicionSubject.value;
    if (ed == null || !isArray(ed.fotos)) return [];
    else return ed.fotos;
  }

  onAddPhoto() {
    let ed = this.edicionSubject.value;
    if (ed != null) {
      let body: IDialogBody<IEdicion> = {
        action: ActionTipo.crear,
        path: 'edicion',
        data: ed,
      };
      const dialogRef = this.dialog.open(FormUploadImageComponent, {
        maxWidth: '550px',
        maxHeight: '100%',
        height: 'auto',
        data: body,
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.ngOnInit();
      });
    }
  }

  onEdit() {
    let edic = this.edicionSubject.value;
    if (edic != null) {
      const body = {
          action: ActionTipo.editar,
          data: edic,
        },
        dialogRef = this.dialog.open(FormEdicionComponent, {
          maxWidth: '550px',
          maxHeight: '100%',
          height: 'auto',
          data: body,
        });
      dialogRef.afterClosed().subscribe((result) => {
        let ed: IEdicion = result;
        if (ed != null) {
          this.edicionServ.actualizarEdicion(ed).subscribe(
            () => {
              this.mostrarMensaje(
                `Se ha editado correctamente la edición ${ed.nombre}`,
                'success'
              );
              this.ngOnInit();
            },
            () => {
              this.mostrarMensaje(
                `No se ha podido actualizar la edición ${ed.nombre}`,
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
        subtitulo: 'Está seguro que desea borrar la edición?',
      },
      dialogRef = this.dialog.open(ConfirmarComponent, {
        data: dataBody,
      });
    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) this.onDelete();
    });
  }

  onDelete() {
    let ed = this.edicionSubject.value;
    if (ed != null) {
      this.loading = true;
      this.edicionServ.eliminarEdicion(ed).subscribe(
        () => {
          this.mostrarMensaje(
            `Se ha dado de baja correctamente la edición ${ed.nombre}`,
            'success'
          );
          //this.ngOnInit();
          this.router.navigate(['/ediciones']);
        },
        () => {
          this.mostrarMensaje(
            `No se ha podido dar de baja la edición ${ed.nombre}`,
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
