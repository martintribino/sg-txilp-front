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
} from 'src/app/interface/interface.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArtistaComponent } from 'src/app/dialog/form-artista/form-artista.component';
import { AuthenticationService } from 'src/app/services/auth.service';

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

  onEdit() {
    let art = this.artistaSubject.value;
    if (art != null) {
      const body = {
          action: ActionTipo.editar,
          data: this.artistaSubject.value,
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
          //this.ngOnInit();
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
