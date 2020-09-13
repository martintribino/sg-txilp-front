import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  IObra,
  MSGTIME,
  ActionTipo,
  IArtista,
  IEtiqueta,
  IFiltroBody,
} from 'src/app/interface/interface.model';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { ObraService } from 'src/app/services/obra.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormObraComponent } from 'src/app/dialog/form-obra/form-obra.component';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.styl'],
})
export class ObrasComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IObra>;
  private obrasSubject = new BehaviorSubject<Array<IObra>>([]);
  obs: BehaviorSubject<Array<IObra>>;
  private loading: boolean = false;
  pageSizeOptions: number[] = [5, 10, 20];
  displayTitleCol: Array<string> = ['titulo', 'action'];
  displayedColumns: Array<string> = [
    'nombre',
    'descripcion',
    'artistas',
    'etiquetas',
  ];
  searchColumns: Array<string> = [
    'nombre',
    'descripcion',
    'artistas',
    'etiquetas',
  ];
  searchSelectedColumns: Array<string> = this.searchColumns;

  constructor(
    private obraServ: ObraService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.obrasSubject.next([]);
    this.dataSource = new MatTableDataSource<IObra>([]);
  }

  ngOnInit(): void {
    this.loading = true;
    this.obraServ.getObras().subscribe(
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

  onSuccess(result: Array<IObra>) {
    this.changeDataSource(result);
    this.loading = false;
  }

  private changeDataSource(result: Array<IObra>) {
    this.obrasSubject.next(result);
    this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<IObra>(result);
    this.obs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.predicateFn;
  }

  predicateFn = (obra: IObra, filter: string) => {
    for (const [key, value] of Object.entries(obra)) {
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
    if (this.searchSelectedColumns.includes('artistas')) {
      obra.artistas.map((art) => {
        strSrch += `${art.nombre}${art.apellido}${art.apodo}`;
      });
      if (strSrch.toLowerCase().indexOf(filter) != -1) return true;
    }
    if (this.searchSelectedColumns.includes('etiquetas')) {
      strSrch = '';
      obra.etiquetas.map((eti) => {
        strSrch += `${eti.nombre}`;
      });
      if (strSrch.toLowerCase().indexOf(filter) != -1) return true;
    }
    return false;
  };

  onError(error) {
    this.obrasSubject.next([]);
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.loading = false;
  }

  onCreate() {
    let obra: IObra = {
      id: null,
      nombre: '',
      descripcion: '',
      duracion: 0,
      fotos: [],
      artistas: [],
      etiquetas: [],
    };
    const body = { action: ActionTipo.crear, data: obra },
      dialogRef = this.dialog.open(FormObraComponent, {
        maxWidth: '550px',
        maxHeight: '100%',
        height: 'auto',
        data: body,
      });
    dialogRef.afterClosed().subscribe((result) => {
      let obr: IObra = result;
      if (obr != null) {
        this.obraServ.crearObra(obr).subscribe(
          () => {
            this.mostrarMensaje(
              `Se ha creado correctamente la obra ${obr.nombre}`,
              'success'
            );
            this.ngOnInit();
          },
          () => {
            this.mostrarMensaje(
              `No se ha podido crear la obra ${obr.nombre}`,
              'error'
            );
          }
        );
      }
    });
  }

  getArtistas(artistas: Array<IArtista>, i: number, s: string = ', ') {
    let str: string = '',
      esPrimero: boolean = true;
    if (artistas == null || artistas.length == 0) return 'No hay artistas.';
    artistas.forEach((art) => {
      let sep: string = esPrimero ? '' : s;
      str += `${sep}${art.nombre} ${art.apellido}`;
    });
    return str;
  }

  getEtiquetas(etiquetas: Array<IEtiqueta>, i: number, s: string = ', ') {
    let str: string = '',
      esPrimero: boolean = true;
    if (etiquetas == null || etiquetas.length == 0) return 'No hay etiquetas.';
    etiquetas.forEach((et) => {
      let sep: string = esPrimero ? '' : s;
      str += `${sep}${et.nombre}`;
    });
    return str;
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
