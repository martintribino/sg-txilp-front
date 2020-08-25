import { Component, OnInit } from '@angular/core';
import { ArtistaService } from 'src/app/services/artista.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import {
  IArtista,
  ActionTipo,
  MSGTIME,
  RolTipo,
  IDialogBody,
  IEtiqueta,
} from 'src/app/interface/interface.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArtistaComponent } from 'src/app/dialog/form-artista/form-artista.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { isArray } from 'util';
import { FormUploadImageComponent } from 'src/app/dialog/form-upload-image/form-upload-image.component';
import { ArchivosService } from 'src/app/services/archivos.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.styl'],
})
export class ArtistaComponent implements OnInit {
  private artistaSubject = new BehaviorSubject<IArtista>(null);
  artista = this.artistaSubject.asObservable();
  private loading: boolean = false;
  private id: number = null;
  private imgPath: string = 'assets/images/user.png';

  constructor(
    private authService: AuthenticationService,
    private artistaServ: ArtistaService,
    private archivoServ: ArchivosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.artistaServ.getArtista(this.id).subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error),
      () => (this.loading = false)
    );
  }

  onSuccess(result: IArtista) {
    this.artistaSubject.next(result);
    this.loading = false;
  }

  onError(error) {
    this.artistaSubject.next(null);
    this.loading = false;
  }

  getFotos() {
    let art: IArtista = this.artistaSubject.value;
    if (art == null || !isArray(art.fotos)) return [];
    else return art.fotos;
  }

  onAddPhoto() {
    let art = this.artistaSubject.value;
    if (art != null) {
      let body: IDialogBody<IArtista> = {
        action: ActionTipo.crear,
        path: 'artista',
        data: art,
      };
      const dialogRef = this.dialog.open(FormUploadImageComponent, {
        maxWidth: '550px',
        maxHeight: '100%',
        height: 'auto',
        data: body,
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.ngOnInit();
      });
    }
  }

  onEdit() {
    let artst = this.artistaSubject.value;
    if (artst != null) {
      const body = {
          action: ActionTipo.editar,
          data: artst,
        },
        dialogRef = this.dialog.open(FormArtistaComponent, {
          maxWidth: '550px',
          maxHeight: '100%',
          height: 'auto',
          data: body,
        });
      dialogRef.afterClosed().subscribe((result) => {
        let art: IArtista = result;
        if (art != null) {
          this.artistaServ.actualizarArtista(art).subscribe(
            () => {
              this.mostrarMensaje(
                `Se ha editado correctamente el artista ${art.nombre}`,
                'success'
              );
              this.ngOnInit();
            },
            () => {
              this.mostrarMensaje(
                `No se ha podido actualizar el artista ${art.nombre}`,
                'error'
              );
            }
          );
        }
      });
    }
  }

  onDelete() {
    let art = this.artistaSubject.value;
    if (art != null) {
      this.loading = true;
      this.artistaServ.eliminarArtista(art).subscribe(
        () => {
          this.mostrarMensaje(
            `Se ha dado de baja correctamente al artista ${art.nombre}`,
            'success'
          );
          this.router.navigate(['/artistas']);
        },
        () => {
          this.mostrarMensaje(
            `No se ha podido dar de baja el artista ${art.nombre}`,
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

  agregarEtiqueta(nombreSel: string) {
    let art = this.artistaSubject.value;
    if (art != null) {
      let eti: IEtiqueta = {
          id: null,
          nombre: nombreSel,
        },
        etiAux = [...art.etiquetas];
      art.etiquetas.push(eti);
      this.loading = true;
      this.artistaServ.actualizarArtista(art).subscribe(
        () => {
          this.mostrarMensaje(
            `Se ha agregado la etiqueta ${nombreSel}`,
            'success'
          );
          this.ngOnInit();
        },
        () => {
          this.mostrarMensaje(
            `No se ha podido agregar la etiqueta ${nombreSel}`,
            'error'
          );
          art.etiquetas = etiAux;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  eliminarEtiqueta(etiqueta: IEtiqueta) {
    let art = this.artistaSubject.value;
    if (art != null) {
      art.etiquetas = art.etiquetas.filter((e) => e.id != etiqueta.id);
      this.loading = true;
      this.artistaServ.actualizarArtista(art).subscribe(
        () => {
          this.mostrarMensaje(`Se ha eliminado la etiqueta`, 'success');
          this.ngOnInit();
        },
        () => {
          this.mostrarMensaje(`No se ha podido eliminar la etiqueta`, 'error');
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
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

  isAdmin() {
    let usuario = this.authService.getUsuario();
    return usuario != null && usuario.rol == RolTipo.Administrador;
  }
}
