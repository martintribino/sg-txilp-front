import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import {
  IUsuario,
  MSGTIME,
  ActionTipo,
  IDireccion,
  IFiltroBody,
} from 'src/app/interface/interface.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormUsuarioComponent } from 'src/app/dialog/form-usuario/form-usuario.component';
import { FormDireccionComponent } from 'src/app/dialog/form-direccion/form-direccion.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.styl'],
})
export class UsuariosComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IUsuario>;
  private usuariosSubject = new BehaviorSubject<Array<IUsuario>>([]);
  private usuarios = this.usuariosSubject.asObservable();
  obs: BehaviorSubject<Array<IUsuario>> = new BehaviorSubject<Array<IUsuario>>(
    []
  );
  private loading: boolean = false;
  private pageSizeOptions: number[] = [5, 10, 20];
  displayTitleCol: Array<string> = ['titulo', 'action'];
  displayedColumns: Array<string> = ['nombre', 'nombreUsuario', 'email', 'rol'];
  searchColumns: Array<string> = [
    'nombre',
    'apellido',
    'nombreUsuario',
    'email',
    'dni',
    'rol',
  ];
  searchSelectedColumns: Array<string> = this.searchColumns;

  constructor(
    private usuService: UsuariosService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.usuariosSubject.next([]);
    this.dataSource = new MatTableDataSource<IUsuario>([]);
  }

  ngOnInit(): void {
    this.loading = true;
    this.usuService.getUsuarios().subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error),
      () => (this.loading = false)
    );
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  onSuccess(result: Array<IUsuario>) {
    this.loading = false;
    this.usuariosSubject.next(result);
    this.changeDataSource(result);
  }

  onError(error) {
    this.usuariosSubject.next([]);
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.loading = false;
  }

  private changeDataSource(result: Array<IUsuario>) {
    this.usuariosSubject.next(result);
    this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<IUsuario>(result);
    this.obs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.predicateFn;
  }

  predicateFn = (usuario: IUsuario, filter: string) => {
    for (const [key, value] of Object.entries(usuario)) {
      if (this.searchSelectedColumns.includes(key)) {
        if (
          (typeof value === 'string' &&
            value.toLowerCase().indexOf(filter) != -1) ||
          (typeof value === 'number' && value.toString().indexOf(filter) != -1)
        )
          return true;
      }
    }
    //casos excepcionales
    var strSrch: string = '';
    if (this.searchSelectedColumns.includes('rol')) {
      strSrch += `${usuario.rol.nombre}`;
      if (strSrch.toLowerCase().indexOf(filter) != -1) return true;
    }
    return false;
  };

  onCreate() {
    let usuario: IUsuario = {
      id: null,
      nombreUsuario: '',
      nombre: '',
      apellido: '',
      telefono: 0,
      dni: 0,
      email: '',
      rol: null,
      direccion: null,
    };
    const body = { action: ActionTipo.crear, data: usuario },
      dialogRef = this.dialog.open(FormUsuarioComponent, {
        maxWidth: '550px',
        maxHeight: '100%',
        height: 'auto',
        data: body,
      });
    dialogRef.afterClosed().subscribe((result) => {
      let usu: IUsuario = result;
      if (usu != null) {
        this.usuService.crearUsuario(usu).subscribe(
          () => {
            this.mostrarMensaje(
              `Se ha creado correctamente el usuario ${usu.nombreUsuario}`,
              'success'
            );
            this.ngOnInit();
          },
          () => {
            this.mostrarMensaje(
              `No se ha podido crear el usuario ${usu.nombreUsuario}`,
              'error'
            );
          }
        );
      }
    });
  }

  onEditDireccion(usu: IUsuario) {
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
          usu.direccion = direccion;
          this.usuService.actualizarUsuario(usu).subscribe(
            () => {
              this.mostrarMensaje(
                `Se ha actualizado correctamente la dirección del usuario ${usu.nombreUsuario}`,
                'success'
              );
            },
            () => {
              this.mostrarMensaje(
                `No se ha podido actualizar la dirección del usuario ${usu.nombreUsuario}`,
                'error'
              );
            }
          );
        }
      });
    }
  }

  onDelete(usuario: IUsuario) {
    if (usuario != null) {
      this.usuService.eliminarUsuario(usuario).subscribe(
        () => {
          this.mostrarMensaje(
            `Se ha dado de baja correctamente al usuario ${usuario.nombreUsuario}`,
            'success'
          );
          this.ngOnInit();
        },
        () => {
          this.mostrarMensaje(
            `No se ha podido dar de baja el usuario ${usuario.nombreUsuario}`,
            'error'
          );
        }
      );
    }
  }

  onEdit(usuario: IUsuario) {
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
        //no queremos cambiar el nombre de usuario
        usu.id = usuario.id;
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
          }
        );
      }
    });
  }

  onFilterSearch(fb: IFiltroBody) {
    this.searchSelectedColumns = fb.campos;
    if (this.dataSource.data != null && this.dataSource.data.length > 0)
      this.dataSource.filter = fb.filtro.trim().toLowerCase();
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
