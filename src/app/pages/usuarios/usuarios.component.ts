import {
  Component,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { IUsuario, IDictionary } from 'src/app/interface/interface.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormUsuarioComponent } from 'src/app/dialog/form-usuario/form-usuario.component';
import {
  trigger,
  state,
  transition,
  animate,
  style,
} from '@angular/animations';
import { FormDireccionComponent } from 'src/app/dialog/form-direccion/form-direccion.component';
import { UsuarioDetalleComponent } from 'src/app/dialog/usuario-detalle/usuario-detalle.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.styl'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ opacity: 0, height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ opacity: 1, height: '*' })),
      transition('expanded => collapsed', animate('300ms ease-out')),
      transition('collapsed => expanded', animate('150ms ease-out')),
    ]),
    trigger('loading', [
      state(
        'hide',
        style({ opacity: 0, height: '0px', minHeight: '0', display: 'none' })
      ),
      state('show', style({ opacity: 1, height: '*' })),
      transition('show => hide', animate('400ms ease-in')),
      transition('hide => show', animate('200ms ease-in')),
    ]),
  ],
})
export class UsuariosComponent implements AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IUsuario>;
  private usuariosSubject = new BehaviorSubject<Array<IUsuario>>([]);
  private usuarios = this.usuariosSubject.asObservable();
  private obs: BehaviorSubject<Array<IUsuario>>;
  private pageSize: number = 5;
  private pageSizeOptions: number[] = [5, 10, 20];
  private loadingDict: Array<IDictionary<boolean>>;
  private displayedColumns: Array<string> = [
    'nombre',
    'apellido',
    'nombreUsuario',
    'actions',
  ];
  private descColumns: Array<string> = ['descripcion'];
  private loadColumns: Array<string> = ['loading'];

  constructor(
    private usuService: UsuariosService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.usuariosSubject.next([]);
    this.loadingDict = [];
    this.dataSource = new MatTableDataSource<IUsuario>([]);
  }

  ngAfterViewInit(): void {
    this.usuService.getUsuarios().subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error)
    );
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  onSuccess(result: Array<IUsuario>) {
    result.map((usu) => {
      this.loadingDict[usu.nombreUsuario] = false;
    });
    this.changeDataSource(result);
  }

  onError(error) {
    this.usuariosSubject.next([]);
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  private changeDataSource(result: Array<IUsuario>) {
    this.usuariosSubject.next(result);
    this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<IUsuario>(result);
    this.obs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  onCreate() {
    let usuario: IUsuario = {
      nombreUsuario: '',
      nombre: '',
      apellido: '',
      telefono: 0,
      dni: 0,
      email: '',
      rol: null,
      direccion: null,
    };
    const dialogRef = this.dialog.open(FormUsuarioComponent, {
      maxWidth: '550px',
      maxHeight: '100%',
      height: 'auto',
      data: usuario,
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
            this.ngAfterViewInit();
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

  onDetailUsuario(usuario: IUsuario) {
    const dialogRef = this.dialog.open(UsuarioDetalleComponent, {
      maxWidth: '550px',
      maxHeight: '80%',
      height: 'auto',
      data: usuario,
    });
  }

  onEditDireccion(usuario: IUsuario) {
    console.log('onEditDireccion');
    console.log(usuario);
    /*
    TODO - integrating map with coordinates
    const dialogRef = this.dialog.open(FormDireccionComponent, {
      maxWidth: '550px',
      maxHeight: '100%',
      height: 'auto',
      data: usuario.direccion,
    });
    dialogRef.afterClosed().subscribe((result) => {
      let direccion: IDireccion = result;
      if (direccion != null) {
        usuario.direccion = direccion;
        this.usuService.actualizarUsuario(usuario).subscribe(
          () => {
            this.mostrarMensaje(
              `Se ha actualizado correctamente el usuario ${usuario.nombreUsuario}`,
              'success'
            );
            this.ngAfterViewInit();
          },
          () => {
            this.mostrarMensaje(
              `No se ha podido actualizar el usuario ${usuario.nombreUsuario}`,
              'error'
            );
          }
        );
      }
    });
    */
  }

  onDelete(usuario: IUsuario) {
    console.log('onDelete');
    console.log(usuario);
  }

  onEdit(usuario: IUsuario) {
    console.log('onEdit');
    console.log(usuario);
  }

  private mostrarMensaje(
    strError: string,
    clase: string = '',
    time: number = 2000,
    pos: MatSnackBarVerticalPosition = 'bottom'
  ) {
    this.snackBar.open(strError, '', {
      duration: time,
      verticalPosition: pos,
      panelClass: clase,
    });
  }
}
