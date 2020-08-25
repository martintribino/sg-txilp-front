import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { IEtiqueta } from 'src/app/interface/interface.model';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-etiquetas-entidad',
  templateUrl: './etiquetas-entidad.component.html',
  styleUrls: ['./etiquetas-entidad.component.styl'],
})
export class EtiquetasEntidadComponent implements OnInit {
  @Input() etiquetas: Array<IEtiqueta> = [];
  @Input() loading: boolean = false;
  @Output() agregar = new EventEmitter<string>();
  @Output() eliminar = new EventEmitter<IEtiqueta>();
  private removable = true;
  private addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {}

  ngOnInit(): void {}

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

  remove(etiqueta: IEtiqueta): void {
    console.log('---remove---');
    console.log(etiqueta);
    this.eliminar.emit(etiqueta);
  }
}
