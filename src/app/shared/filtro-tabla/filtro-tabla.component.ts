import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filtro-tabla',
  templateUrl: './filtro-tabla.component.html',
  styleUrls: ['./filtro-tabla.component.styl'],
})
export class FiltroTablaComponent implements OnInit {
  @Input() searchFields: Array<string>;
  @Input() minLenghtSearch: number = 1;
  @Output() filterSearch = new EventEmitter();

  filtroForm: FormGroup = new FormGroup({
    filtro: new FormControl(''),
    campos: new FormControl([]),
  });

  constructor() {
    this.filtroForm = new FormGroup({
      filtro: new FormControl(''),
      campos: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.getFiltroForm.campos.setValue(this.searchFields);
  }

  ngOnDestroy() {}

  onFilter = (event) => {
    const filterValue = this.getFiltroForm.campos.value;
    this.filterSearch.emit(this.filtroForm.value);
  };

  get getFiltroForm() {
    return this.filtroForm.controls;
  }

  compare(a1, a2) {
    return a1 != null && a2 != null && a1 == a2 ? a1 : null;
  }
}
