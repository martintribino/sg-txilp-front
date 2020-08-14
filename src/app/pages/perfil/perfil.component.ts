import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import {
  IUsuario,
  ActionTipo,
  MSGTIME,
  IDireccion,
} from 'src/app/interface/interface.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FormUsuarioComponent } from 'src/app/dialog/form-usuario/form-usuario.component';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDetalleComponent } from 'src/app/dialog/usuario-detalle/usuario-detalle.component';
import { FormDireccionComponent } from 'src/app/dialog/form-direccion/form-direccion.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.styl'],
})
export class PerfilComponent implements OnInit {
  private perfilSubject = new BehaviorSubject<IUsuario>(null);
  perfil = this.perfilSubject.asObservable();
  loading: boolean = false;
  private imgPath: string = 'assets/images/user.png';
  constructor(
    private authService: AuthenticationService,
    private usuService: UsuariosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let usu = this.authService.getUsuario();
    this.loading = false;
    if (usu != null) {
      this.loading = true;
      this.usuService.getUsuario(usu.nombreUsuario).subscribe(
        (data) => this.perfilSubject.next(data),
        (error) => {this.perfilSubject.next(null);
          this.loading = false;},
        () => {
          this.loading = false;
        }
      );
    }
  }

  onDetailUsuario() {
    let usu = this.perfilSubject.getValue();
    if (usu != null) {
      const dialogRef = this.dialog.open(UsuarioDetalleComponent, {
        maxWidth: '550px',
        maxHeight: '90%',
        height: 'auto',
        data: usu,
      });
    }
  }

  onEditDireccion() {
    let usu = this.perfilSubject.getValue();
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
          this.usuService.actualizarUsuario(usu).subscribe(
            () => {
              this.mostrarMensaje(
                `Se ha actualizado correctamente la dirección del usuario ${usu.nombreUsuario}`,
                'success'
              );
              this.ngOnInit();
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
    let usuario = this.perfilSubject.getValue();
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
          //no queremos cambiar el nombre de usuario
          usu.nombreUsuario = usuario.nombreUsuario;
          //queremos actualizar la direccion aparte
          usu.direccion = null;
          this.usuService.actualizarUsuario(usu).subscribe(
            () => {
              this.mostrarMensaje(
                `Se ha editado correctamente el usuario ${usu.nombreUsuario}`,
                'success'
              );
              this.ngOnInit();
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
