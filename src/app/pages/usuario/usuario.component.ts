import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  IUsuario,
  MSGTIME,
  IDireccion,
  ActionTipo,
  RolTipo,
  IDialogConfirmBody,
} from 'src/app/interface/interface.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormDireccionComponent } from 'src/app/dialog/form-direccion/form-direccion.component';
import { FormUsuarioComponent } from 'src/app/dialog/form-usuario/form-usuario.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ConfirmarComponent } from 'src/app/dialog/confirmar/confirmar.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.styl'],
})
export class UsuarioComponent implements AfterViewInit, AfterViewChecked {
  private usuarioSubject = new BehaviorSubject<IUsuario>(null);
  usuario = this.usuarioSubject.asObservable();
  private loading: boolean = false;
  private id: number = null;
  imgPath: string = `ng/assets/images/user.png`;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private usuarioServ: UsuariosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngAfterViewInit(): void {
    this.loading = true;
    this.usuarioServ.getUsuario(this.id).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error),
      () => (this.loading = false)
    );
  }

  onSuccess(result: IUsuario) {
    this.usuarioSubject.next(result);
    this.loading = false;
  }

  onError(error) {
    this.usuarioSubject.next(null);
    this.loading = false;
  }

  onEditDireccion() {
    let usu = this.usuarioSubject.getValue();
    if (usu != null) {
      const dialogRef = this.dialog.open(FormDireccionComponent, {
        maxWidth: '550px',
        maxHeight: '100%',
        height: 'auto',
        data: usu.direccion,
      });
      dialogRef.afterClosed().subscribe((result) => {
        let direccion: IDireccion = result;
        if (direccion != null) {
          this.loading = true;
          usu.direccion = direccion;
          this.usuarioServ.actualizarUsuario(usu).subscribe(
            () => {
              this.mostrarMensaje(
                `Se ha actualizado correctamente la dirección del usuario ${usu.nombreUsuario}`,
                'success'
              );
              this.ngAfterViewInit();
            },
            () => {
              this.mostrarMensaje(
                `No se ha podido actualizar  la dirección del usuario ${usu.nombreUsuario}`,
                'error'
              );
              this.loading = false;
            },
            () => {
              this.loading = false;
            }
          );
        }
      });
    }
  }

  onEdit() {
    let usuario = this.usuarioSubject.getValue();
    if (usuario != null) {
      const body = { action: ActionTipo.editar, data: usuario },
        dialogRef = this.dialog.open(FormUsuarioComponent, {
          maxWidth: '550px',
          maxHeight: '100%',
          height: 'auto',
          data: body,
        });
      dialogRef.afterClosed().subscribe((result) => {
        let usu: IUsuario = result;
        if (usu != null) {
          this.loading = true;
          //queremos actualizar la direccion aparte
          usu.direccion = usuario.direccion;
          this.usuarioServ.actualizarUsuario(usu).subscribe(
            () => {
              this.mostrarMensaje(
                `Se ha editado correctamente el usuario ${usu.nombreUsuario}`,
                'success'
              );
              this.ngAfterViewInit();
            },
            () => {
              this.mostrarMensaje(
                `No se ha podido actualizar el usuario ${usu.nombreUsuario}`,
                'error'
              );
              this.loading = false;
            },
            () => {
              this.loading = false;
            }
          );
        }
      });
    }
  }

  onConfirmDelete() {
    const dataBody: IDialogConfirmBody = {
        titulo: 'Confirmar Borrado',
        subtitulo: 'Está seguro que desea borrar el usuario?',
      },
      dialogRef = this.dialog.open(ConfirmarComponent, {
        data: dataBody,
      });
    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) this.onDelete();
    });
  }

  onDelete() {
    let usuario = this.usuarioSubject.getValue();
    if (usuario != null) {
      this.loading = true;
      this.usuarioServ.eliminarUsuario(usuario).subscribe(
        () => {
          this.mostrarMensaje(
            `Se ha dado de baja correctamente el usuario ${usuario.nombre}`,
            'success'
          );
          this.router.navigate(['/usuarios']);
        },
        () => {
          this.mostrarMensaje(
            `No se ha podido dar de baja el usuario ${usuario.nombre}`,
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

  isAdmin() {
    let usuario = this.authService.getUsuario();
    return usuario != null && usuario.rol == RolTipo.Administrador;
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
}
