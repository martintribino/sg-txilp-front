import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { IEtiqueta, MSGTIME } from 'src/app/interface/interface.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { EtiquetaService } from 'src/app/services/etiqueta.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-etiquetas-entidad',
  templateUrl: './etiquetas-entidad.component.html',
  styleUrls: ['./etiquetas-entidad.component.styl'],
})
export class EtiquetasEntidadComponent implements OnInit, OnChanges {
  @Input() etiquetas: Array<IEtiqueta> = [];
  @Input() loading: boolean = false;
  @Input() selectable: boolean = false;
  @Output() agregar = new EventEmitter<string>();
  @Output() seleccionar = new EventEmitter<IEtiqueta>();
  @Output() eliminar = new EventEmitter<IEtiqueta>();
  removable: boolean = true;
  addOnBlur: boolean = true;
  etiquetaclase: string = '';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    if (this.selectable) {
      this.etiquetaclase = 'selectable-chip';
    }
  }

  ngOnChanges(changes: SimpleChanges) {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.agregar.emit(value);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  select(etiqueta: IEtiqueta): void {
    this.seleccionar.emit(etiqueta);
  }

  remove(etiqueta: IEtiqueta): void {
    this.eliminar.emit(etiqueta);
  }

  isSelected(etiqueta: IEtiqueta): Boolean {
    let usuario = this.authService.getUsuario();
    return (
      usuario != null &&
      etiqueta.usuariosFav.some((usu) => usu.id === usuario.id)
    );
  }
}
