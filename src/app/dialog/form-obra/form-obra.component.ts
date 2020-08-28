import { Component, OnInit, Inject } from '@angular/core';
import {
  ActionTipo,
  IObra,
  IDialogBody,
  IArtista,
} from 'src/app/interface/interface.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtistaService } from 'src/app/services/artista.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-form-obra',
  templateUrl: './form-obra.component.html',
  styleUrls: ['./form-obra.component.styl'],
})
export class FormObraComponent implements OnInit {
  obraForm: FormGroup;
  obra: IObra = null;
  private action: ActionTipo;
  private tipos: Array<{ indice: string; value: string }> = [];
  private tipoSelected: string = '';
  private artistasSubject = new BehaviorSubject<Array<IArtista>>([]);
  artistasObs = this.artistasSubject.asObservable();

  constructor(
    private artistaServ: ArtistaService,
    public dialogRef: MatDialogRef<FormObraComponent>,
    @Inject(MAT_DIALOG_DATA) public body: IDialogBody<IObra>
  ) {
    this.artistasSubject.next([]);
    this.obra = body.data;
    this.action = body.action;
    this.obraForm = new FormGroup({
      id: new FormControl(this.obra.id),
      nombre: new FormControl(this.obra.nombre),
      descripcion: new FormControl(this.obra.descripcion),
      duracion: new FormControl(this.obra.duracion, [Validators.min(0)]),
      fotos: new FormControl(this.obra.fotos),
      artistas: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.artistaServ.getArtistas().subscribe(
      (data) => {
        this.artistasSubject.next(data);
        this.getObraForm.artistas.setValue(this.obra.artistas);
      },
      (error) => {
        this.artistasSubject.next([]);
        this.getObraForm.artistas.setValue([]);
      }
    );
  }

  ngOnDestroy() {}

  onSubmit() {
    this.dialogRef.close(this.obraForm.value);
  }

  clean() {
    this.obraForm.reset();
  }

  get getObraForm() {
    return this.obraForm.controls;
  }

  compare(a1, a2) {
    return a1.id == a2.id ? a1 : null;
  }
}
