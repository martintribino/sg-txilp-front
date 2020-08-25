import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import {
  MSGTIME,
  IActividad,
  ActionTipo,
} from 'src/app/interface/interface.model';
import { MatTableDataSource } from '@angular/material/table';
import { ActividadService } from 'src/app/services/actividad.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormActividadComponent } from 'src/app/dialog/form-actividad/form-actividad.component';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.styl'],
})
export class ActividadesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IActividad>;
  private actividadesSubject = new BehaviorSubject<Array<IActividad>>([]);
  obs: BehaviorSubject<Array<IActividad>>;
  private loading: boolean = false;
  private pageSizeOptions: number[] = [5, 10, 20];
  private displayedColumns: Array<string> = [
    'nombre',
    'descripcion',
    'desde',
    'hasta',
    'actions',
  ];

  constructor(
    private actividadServ: ActividadService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.actividadesSubject.next([]);
    this.dataSource = new MatTableDataSource<IActividad>([]);
  }

  ngOnInit(): void {
    this.loading = true;
    this.actividadServ.getActividades().subscribe(
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

  onSuccess(result: Array<IActividad>) {
    this.actividadesSubject.next(result);
    this.changeDataSource(result);
    this.loading = false;
  }

  onError(error) {
    this.actividadesSubject.next([]);
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.loading = false;
  }

  private changeDataSource(result: Array<IActividad>) {
    this.actividadesSubject.next(result);
    this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<IActividad>(result);
    this.obs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  onCreate() {
    let actividad: IActividad = {
      id: null,
      nombre: '',
      descripcion: '',
      desde: new Date(),
      hasta: new Date(),
      entradasVendidas: 0,
      obra: null,
      espacio: null,
      edicion: null,
    };
    const body = { action: ActionTipo.crear, data: actividad },
      dialogRef = this.dialog.open(FormActividadComponent, {
        maxWidth: '550px',
        maxHeight: '100%',
        height: 'auto',
        data: body,
      });
    dialogRef.afterClosed().subscribe((result) => {
      let act: IActividad = result;
      if (act != null) {
        this.actividadServ.crearActividad(act).subscribe(
          () => {
            this.mostrarMensaje(
              `Se ha creado correctamente la actividad ${act.nombre}`,
              'success'
            );
            this.ngOnInit();
          },
          () => {
            this.mostrarMensaje(
              `No se ha podido crear la actividad ${act.nombre}`,
              'error'
            );
          }
        );
      }
    });
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource.data != null && this.dataSource.data.length > 0)
      this.dataSource.filter = filterValue.trim().toLowerCase();
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
