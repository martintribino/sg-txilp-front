import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  IArtista,
  ActionTipo,
  MSGTIME,
  IFiltroBody,
  IObra,
  IEtiqueta,
} from 'src/app/interface/interface.model';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ArtistaService } from 'src/app/services/artista.service';
import { FormArtistaComponent } from 'src/app/dialog/form-artista/form-artista.component';
import { ObraService } from 'src/app/services/obra.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.styl'],
})
export class ArtistasComponent implements OnInit {
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  private dataSource: MatTableDataSource<IArtista>;
  private artistasSubject = new BehaviorSubject<Array<IArtista>>([]);
  private obrasSubject = new BehaviorSubject<Array<IObra>>([]);
  obras = this.obrasSubject.asObservable();
  obs: BehaviorSubject<Array<IArtista>>;
  private id: number = null;
  loading: boolean = false;
  pageSizeOptions: number[] = [5, 10, 20];
  displayTitleCol: Array<string> = ['titulo', 'action'];
  displayedColumns: Array<string> = ['nombre', 'apellido', 'apodo', 'obras', 'etiquetas'];
  searchColumns: Array<string> = [
    'nombre',
    'apellido',
    'apodo',
    'etiquetas',
    'obras',
  ];
  searchSelectedColumns: Array<string> = this.searchColumns;

  constructor(
    private artistaServ: ArtistaService,
    private changeDetectorRef: ChangeDetectorRef,
    private obraServ: ObraService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.artistasSubject.next([]);
    this.dataSource = new MatTableDataSource<IArtista>([]);
  }

  ngOnInit(): void {
    this.loading = true;
    this.artistaServ.getArtistas().subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error),
      () => (this.loading = false)
    );
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  onSuccess(result: Array<IArtista>) {
    result.map((a:IArtista) => {
      this.obraServ.getObrasPorArtista(a.id).subscribe(
        (result) => {
          a.obras = result;
        },
        (error) =>  {}
      );
    });
    this.changeDataSource(result);
    this.loading = false;
  }

  onError(error) {
    this.artistasSubject.next([]);
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.loading = false;
  }

  private changeDataSource(result: Array<IArtista>) {
    this.artistasSubject.next(result);
    this.changeDetectorRef.detectChanges();
    this.dataSource = new MatTableDataSource<IArtista>(result);
    this.dataSource.filterPredicate = this.predicateFn;
    this.obs = this.dataSource.connect();
  }

  predicateFn = (artista: IArtista, filter: string) => {
    for (const [key, value] of Object.entries(artista)) {
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
    if (this.searchSelectedColumns.includes('obras')) {
      artista.obras.map((obra) => {
        strSrch += `${obra.nombre}`;
      });
      if (strSrch.toLowerCase().indexOf(filter) != -1) return true;
    }
    if (this.searchSelectedColumns.includes('etiquetas')) {
      strSrch = '';
      artista.etiquetas.map((eti) => {
        strSrch += `${eti.nombre}`;
      });
      if (strSrch.toLowerCase().indexOf(filter) != -1) return true;
    }
    return false;
  };

  getObras(obras: Array<IObra>, i: number, s: string = ', ') {
    let str: string = '',
      esPrimero: boolean = true;
    if (obras == null || obras.length == 0) return 'No hay obras.';
    obras.forEach((obra: IObra) => {
      let sep: string = esPrimero ? '' : s;
      esPrimero = false;
      str += `${sep}${obra.nombre}`;
    });
    return str;
  }

  getEtiquetas(etiquetas: Array<IEtiqueta>, i: number, s: string = ', ') {
    let str: string = '',
      esPrimero: boolean = true;
    if (etiquetas == null || etiquetas.length == 0) return 'No hay etiquetas.';
    etiquetas.forEach((e: IEtiqueta) => {
      let sep: string = esPrimero ? '' : s;
      esPrimero = false;
      str += `${sep}${e.nombre}`;
    });
    return str;
  }

  onCreate() {
    let artista: IArtista = {
      id: null,
      nombre: '',
      apellido: '',
      apodo: '',
      fotos: [],
      etiquetas: [],
      usuariosFav: [],
    };
    const body = { action: ActionTipo.crear, data: artista },
      dialogRef = this.dialog.open(FormArtistaComponent, {
        maxWidth: '550px',
        maxHeight: '100%',
        height: 'auto',
        data: body,
      });
    dialogRef.afterClosed().subscribe((result) => {
      let art: IArtista = result;
      if (art != null) {
        this.artistaServ.crearArtista(art).subscribe(
          () => {
            this.mostrarMensaje(
              `Se ha creado correctamente el artista ${art.nombre}`,
              'success'
            );
            this.ngOnInit();
          },
          () => {
            this.mostrarMensaje(
              `No se ha podido crear el artista ${art.nombre}`,
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
