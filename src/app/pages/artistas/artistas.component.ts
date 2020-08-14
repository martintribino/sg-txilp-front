import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  IArtista,
  ActionTipo,
  MSGTIME,
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

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.styl'],
})
export class ArtistasComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private dataSource: MatTableDataSource<IArtista>;
  private artistasSubject = new BehaviorSubject<Array<IArtista>>([]);
  obs: BehaviorSubject<Array<IArtista>>;
  private loading: boolean = false;
  private pageSizeOptions: number[] = [5, 10, 20];
  private displayedColumns: Array<string> = [
    'nombre',
    'apellido',
    'apodo',
    'actions',
  ];

  constructor(
    private artistaServ: ArtistaService,
    private changeDetectorRef: ChangeDetectorRef,
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

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  onSuccess(result: Array<IArtista>) {
    this.artistasSubject.next(result);
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
    this.obs = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  onCreate() {
    let artista: IArtista = {
      id: null,
      nombre: '',
      apellido: '',
      apodo: '',
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
