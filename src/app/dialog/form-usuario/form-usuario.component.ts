import { Component, Inject } from '@angular/core';
import {
  IUsuario,
  IRol,
  RolTipo,
  IDialogBody,
  ActionTipo,
} from 'src/app/interface/interface.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { regexEmail, regexPhone } from 'src/app/helpers/constants';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.styl'],
})
export class FormUsuarioComponent {
  usuariosForm: FormGroup = new FormGroup({
    nombreUsuario: new FormControl(''),
    clave: new FormControl(null),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    dni: new FormControl(''),
    email: new FormControl(''),
    telefono: new FormControl(''),
    token: new FormControl(''),
    rol: new FormControl(null),
    direccion: new FormControl(null),
  });
  usuario: IUsuario;
  private action: ActionTipo;
  roles: Array<IRol> = [];
  hide: boolean = true;
  private selectedRol: RolTipo | null = null;

  constructor(
    public dialogRef: MatDialogRef<FormUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public body: IDialogBody<IUsuario>
  ) {
    Object.keys(RolTipo).map((rol) => {
      this.roles.push({
        nombre: rol,
        tipo: RolTipo[rol],
      });
    });
    this.usuariosForm = new FormGroup({
      nombreUsuario: new FormControl(''),
      clave: new FormControl(null),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      dni: new FormControl('', [Validators.min(0)]),
      email: new FormControl(''),
      telefono: new FormControl('', [Validators.pattern(regexPhone)]),
      rol: new FormControl(null),
      direccion: new FormControl(null),
    });
    this.hide = true;
    this.usuario = body.data;
    this.action = body.action;
    this.crearUsuarioForm.nombreUsuario.setValue(this.usuario.nombreUsuario);
    this.crearUsuarioForm.nombre.setValue(this.usuario.nombre);
    this.crearUsuarioForm.apellido.setValue(this.usuario.apellido);
    this.crearUsuarioForm.dni.setValue(this.usuario.dni);
    this.crearUsuarioForm.email.setValue(this.usuario.email);
    this.crearUsuarioForm.telefono.setValue(this.usuario.telefono);
    this.crearUsuarioForm.direccion.setValue(this.usuario.direccion);
    this.crearUsuarioForm.rol.setValue(this.usuario.rol);
    if (this.usuario.rol && this.usuario.rol.tipo) {
      if (this.action == ActionTipo.editar)
        this.selectedRol = this.usuario.rol.tipo;
    }
  }

  onSubmit() {
    this.dialogRef.close(this.usuariosForm.value);
  }

  clean() {
    this.usuariosForm.reset();
  }

  visibilityClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.hide = !this.hide;
  }

  get crearUsuarioForm() {
    return this.usuariosForm.controls;
  }

  compare(a1, a2) {
    return a1 != null && a2 != null && a1.nombre == a2.nombre ? a1 : null;
  }
}
