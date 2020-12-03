import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import {
  MSGTIME,
  IActividad,
  ActionTipo,
  IEspacio,
  IObra,
  IEdicion,
  IFiltroBody,
} from 'src/app/interface/interface.model';
import { MatTableDataSource } from '@angular/material/table';
import { ActividadService } from 'src/app/services/actividad.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormActividadComponent } from 'src/app/dialog/form-actividad/form-actividad.component';
import { EdicionService } from 'src/app/services/edicion.service';
import { EspacioService } from 'src/app/services/espacio.service';
import { ObraService } from 'src/app/services/obra.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.styl'],
})
export class ActividadesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  //@ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatSort, {static: false})set matSort(sort: MatSort) {
    if(this.dataSource) {
      this.dataSource.sort = sort;
    }
  };
  private dataSource: MatTableDataSource<IActividad>;
  private actividadesSubject = new BehaviorSubject<Array<IActividad>>([]);
  obs: BehaviorSubject<Array<IActividad>>;
  private loading: boolean = false;
  private pageSizeOptions: number[] = [5, 10, 20];
  private espaciosSubject = new BehaviorSubject<Array<IEspacio>>([]);
  private obrasSubject = new BehaviorSubject<Array<IObra>>([]);
  private edicionesSubject = new BehaviorSubject<Array<IEdicion>>([]);
  displayTitleCol: Array<string> = ['titulo', 'action'];
  displayedColumns: Array<string> = [
    'nombre',
    'edicion',
    'espacio',
    'obra',
    'desde',
    'hasta',
  ];
  searchColumns: Array<string> = [
    'nombre',
    'edicion',
    'espacio',
    'obra',
    'desde',
    'hasta',
  ];
  searchSelectedColumns: Array<string> = this.searchColumns;

  constructor(
    private actividadServ: ActividadService,
    private edicionServ: EdicionService,
    private espacioServ: EspacioService,
    private obraServ: ObraService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.actividadesSubject.next([]);
    this.dataSource = new MatTableDataSource<IActividad>([]);
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
    let actividades = [];
    if (result!=null)
      result.map((ac:IActividad) => {
        if(ac.obraId!=null) {
          ac.obra = this.obrasSubject.value.find((o:IObra) => o.id == ac.obraId);
        }
        if(ac.espacioId!=null) {
          ac.espacio = this.espaciosSubject.value.find((e:IEspacio) => e.id == ac.espacioId);
        }
        actividades.push(ac);
      });
    this.actividadesSubject.next(actividades);
    this.changeDataSource(actividades);
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
    this.dataSource.filterPredicate = this.predicateFn;
  }

  predicateFn = (actividad: IActividad, filter: string) => {
    for (const [key, value] of Object.entries(actividad)) {
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
    if (
      this.searchSelectedColumns.includes('edicion') &&
      actividad.edicion != null
    ) {
      strSrch += `${actividad.edicion.nombre}${actividad.edicion.descripcion}${actividad.edicion.desde}`;
      if (strSrch.toLowerCase().indexOf(filter) != -1) return true;
    }
    if (
      this.searchSelectedColumns.includes('espacio') &&
      actividad.espacio != null
    ) {
      strSrch += `${actividad.espacio.nombre}${actividad.espacio.descripcion}${actividad.espacio.condicion}`;
      if (strSrch.toLowerCase().indexOf(filter) != -1) return true;
    }
    if (this.searchSelectedColumns.includes('obra') && actividad.obra != null) {
      strSrch = '';
      strSrch += `${actividad.obra.nombre}${actividad.obra.descripcion}${actividad.obra.duracion}`;
      if (strSrch.toLowerCase().indexOf(filter) != -1) return true;
    }
    return false;
  };

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
    const body = {
        action: ActionTipo.crear,
        ediciones: this.edicionesSubject.value,
        espacios: this.espaciosSubject.value,
        obras: this.obrasSubject.value,
        data: actividad,
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
