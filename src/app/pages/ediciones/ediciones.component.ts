import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  IEdicion,
  ActionTipo,
  MSGTIME,
} from 'src/app/interface/interface.model';
import { EdicionService } from 'src/app/services/edicion.service';
import { FormEdicionComponent } from 'src/app/dialog/form-edicion/form-edicion.component';

@Component({
  selector: 'app-ediciones',
  templateUrl: './ediciones.component.html',
  styleUrls: ['./ediciones.component.styl'],
})
export class EdicionesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IEdicion>;
  private edicionesSubject = new BehaviorSubject<Array<IEdicion>>([]);
  edicionesObs: BehaviorSubject<Array<IEdicion>>;
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
    private edicionServ: EdicionService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.edicionesSubject.next([]);
    this.dataSource = new MatTableDataSource<IEdicion>([]);
  }

  ngOnInit(): void {
    this.loading = true;
    this.edicionServ.getEdiciones().subscribe(
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

  onSuccess(result: Array<IEdicion>) {
    this.edicionesSubject.next(result);
    this.changeDataSource(result);
    this.loading = false;
  }

  onError(error) {
    this.edicionesSubject.next([]);
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.loading = false;
  }

  private changeDataSource(result: Array<IEdicion>) {
    this.edicionesSubject.next(result);
    this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<IEdicion>(result);
    this.edicionesObs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  onCreate() {
    let edicion: IEdicion = {
      id: null,
      nombre: '',
      descripcion: '',
      desde: null,
      hasta: null,
      actividades: [],
      fotos: [],
    };
    const body = { action: ActionTipo.crear, data: edicion },
      dialogRef = this.dialog.open(FormEdicionComponent, {
        maxWidth: '550px',
        maxHeight: '100%',
        height: 'auto',
        data: body,
      });
    dialogRef.afterClosed().subscribe((result) => {
      let ed: IEdicion = result;
      if (ed != null) {
        this.edicionServ.crearEdicion(ed).subscribe(
          () => {
            this.mostrarMensaje(
              `Se ha creado correctamente la edición ${ed.nombre}`,
              'success'
            );
            this.ngOnInit();
          },
          () => {
            this.mostrarMensaje(
              `No se ha podido crear la edición ${ed.nombre}`,
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
