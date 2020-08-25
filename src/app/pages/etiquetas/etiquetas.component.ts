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
  private etiquetas = this.etiquetasSubject.asObservable();
  private loading: boolean = false;

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

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.loading = true;
      let tag: IEtiqueta = {
        id: null,
        nombre: value,
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
          this.mostrarMensaje(`No se ha podido agregar la etiqueta`, 'success');
          this.loading = false;
        }
      );
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(etiqueta: IEtiqueta): void {
    this.etiquetasServ.eliminarEtiqueta(etiqueta).subscribe(
      (data) => {
        this.mostrarMensaje(
          `Se ha eliminado correctamente la etiqueta ${etiqueta.nombre}`,
          'success'
        );
        this.ngOnInit();
      },
      (error) => {
        this.mostrarMensaje(
          `No se ha podido eliminar la etiqueta ${etiqueta.nombre}`,
          'success'
        );
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
