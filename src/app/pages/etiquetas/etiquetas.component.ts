import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { IEtiqueta, MSGTIME } from 'src/app/interface/interface.model';
import { BehaviorSubject } from 'rxjs';
import { EtiquetaService } from 'src/app/services/etiqueta.service';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-etiquetas',
  templateUrl: './etiquetas.component.html',
  styleUrls: ['./etiquetas.component.styl'],
})
export class EtiquetasComponent implements OnInit {
  private removable = true;
  private addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private etiquetasSubject = new BehaviorSubject<Array<IEtiqueta>>([]);
  etiquetas = this.etiquetasSubject.asObservable();
  loading: boolean = false;
  selectable: boolean = true;

  constructor(
    private etiquetasServ: EtiquetaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.etiquetasServ.getEtiquetas().subscribe(
      (data) => {
        this.etiquetasSubject.next(data);
        this.loading = false;
      },
      (error) => {
        this.etiquetasSubject.next([]);
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {}

  agregarEtiqueta(nombreSel: string): void {
    if ((nombreSel || '').trim()) {
      this.loading = true;
      let tag: IEtiqueta = {
        id: null,
        nombre: nombreSel,
        usuariosFav: [],
      };
      this.etiquetasServ.crearEtiqueta(tag).subscribe(
        (data) => {
          this.etiquetasSubject.getValue().push(data);
          this.mostrarMensaje(
            `Se ha agregado correctamente la etiqueta ${data.nombre}`,
            'success'
          );
          this.loading = false;
        },
        (error) => {
          this.mostrarMensaje(`No se ha podido agregar la etiqueta`, 'error');
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  seleccionarEtiqueta(etiqueta: IEtiqueta): void {
    if (etiqueta != null) {
      this.loading = true;
      this.etiquetasServ.toggleEtiquetaFav(etiqueta).subscribe(
        () => {
          this.mostrarMensaje(
            `Se ha actualizado su interés por la etiqueta correctamente`,
            'success'
          );
          this.ngOnInit();
        },
        () => {
          this.mostrarMensaje(
            `No se ha actualizado su interés por la etiqueta correctamente`,
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

  eliminarEtiqueta(etiqueta: IEtiqueta): void {
    this.loading = true;
    this.etiquetasServ.eliminarEtiqueta(etiqueta).subscribe(
      (data) => {
        this.mostrarMensaje(
          `Se ha eliminado correctamente la etiqueta ${etiqueta.nombre}`,
          'success'
        );
        this.ngOnInit();
        this.loading = false;
      },
      (error) => {
        this.mostrarMensaje(
          `No se ha podido eliminar la etiqueta ${etiqueta.nombre}`,
          'error'
        );
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
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
