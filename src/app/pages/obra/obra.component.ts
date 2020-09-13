import { Component, OnInit } from '@angular/core';
import {
  IObra,
  ActionTipo,
  MSGTIME,
  RolTipo,
  IDialogBody,
  IEtiqueta,
  IDialogConfirmBody,
} from 'src/app/interface/interface.model';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ObraService } from 'src/app/services/obra.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FormObraComponent } from 'src/app/dialog/form-obra/form-obra.component';
import { FormUploadImageComponent } from 'src/app/dialog/form-upload-image/form-upload-image.component';
import { ConfirmarComponent } from 'src/app/dialog/confirmar/confirmar.component';

@Component({
  selector: 'app-obra',
  templateUrl: './obra.component.html',
  styleUrls: ['./obra.component.styl'],
})
export class ObraComponent implements OnInit {
  private obraSubject = new BehaviorSubject<IObra>(null);
  obra = this.obraSubject.asObservable();
  private loading: boolean = false;
  private id: number = null;

  constructor(
    private authService: AuthenticationService,
    private obraServ: ObraService,
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
    this.obraServ.getObra(this.id).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error),
      () => (this.loading = false)
    );
  }

  onSuccess(result: IObra) {
    this.obraSubject.next(result);
    this.loading = false;
  }

  onError(error) {
    this.obraSubject.next(null);
    this.loading = false;
  }

  onAddPhoto() {
    let obra = this.obraSubject.value;
    if (obra != null) {
      let body: IDialogBody<IObra> = {
        action: ActionTipo.crear,
        path: 'obra',
        data: obra,
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
    let obra = this.obraSubject.value;
    if (obra != null) {
      const body = {
          action: ActionTipo.editar,
          data: obra,
        },
        dialogRef = this.dialog.open(FormObraComponent, {
          maxWidth: '550px',
          maxHeight: '100%',
          height: 'auto',
          data: body,
        });
      dialogRef.afterClosed().subscribe((result) => {
        let esp: IObra = result;
        if (esp != null) {
          this.obraServ.actualizarObra(esp).subscribe(
            () => {
              this.mostrarMensaje(
                `Se ha editado correctamente la obra ${esp.nombre}`,
                'success'
              );
              this.ngOnInit();
            },
            () => {
              this.mostrarMensaje(
                `No se ha podido actualizar la obra ${esp.nombre}`,
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
        subtitulo: 'Está seguro que desea borrar la obra?',
      },
      dialogRef = this.dialog.open(ConfirmarComponent, {
        data: dataBody,
      });
    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) this.onDelete();
    });
  }

  onDelete() {
    let obra = this.obraSubject.value;
    if (obra != null) {
      this.loading = true;
      this.obraServ.eliminarObra(obra).subscribe(
        () => {
          this.mostrarMensaje(
            `Se ha dado de baja correctamente la obra ${obra.nombre}`,
            'success'
          );
          //this.ngOnInit();
          this.router.navigate(['/obras']);
        },
        () => {
          this.mostrarMensaje(
            `No se ha podido dar de baja la obra ${obra.nombre}`,
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
    let obra = this.obraSubject.value;
    if (obra != null) {
      let eti: IEtiqueta = {
          id: null,
          nombre: nombreSel,
        },
        etiAux = [...obra.etiquetas];
      this.loading = true;
      this.obraServ.agregarEtiqueta(nombreSel, obra).subscribe(
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
          obra.etiquetas = etiAux;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  eliminarEtiqueta(etiqueta: IEtiqueta) {
    let obra = this.obraSubject.value;
    if (obra != null) {
      obra.etiquetas = obra.etiquetas.filter((e) => e.id != etiqueta.id);
      this.loading = true;
      this.obraServ.actualizarObra(obra).subscribe(
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
