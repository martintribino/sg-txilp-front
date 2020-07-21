import { Component, Inject } from '@angular/core';
import { IUsuario, IRol, RolTipo } from 'src/app/interface/interface.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.styl'],
})
export class FormUsuarioComponent {
  usuariosForm: FormGroup = new FormGroup({
    nombreUsuario: new FormControl(''),
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
  roles: Array<IRol> = [];

  constructor(
    public dialogRef: MatDialogRef<FormUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUsuario
  ) {
    Object.keys(RolTipo).map((rol) => {
      this.roles.push({
        nombre: rol,
        descripcion: '',
        tipo: RolTipo[rol],
      });
    });
    this.usuariosForm = new FormGroup({
      nombreUsuario: new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      dni: new FormControl(''),
      email: new FormControl(''),
      telefono: new FormControl(''),
      rol: new FormControl(null),
      direccion: new FormControl(null),
    });
    this.usuario = data;
    this.crearUsuarioForm.nombreUsuario.setValue(this.usuario.nombreUsuario);
    this.crearUsuarioForm.nombre.setValue(this.usuario.nombre);
    this.crearUsuarioForm.apellido.setValue(this.usuario.apellido);
    this.crearUsuarioForm.dni.setValue(this.usuario.dni);
    this.crearUsuarioForm.email.setValue(this.usuario.email);
    this.crearUsuarioForm.telefono.setValue(this.usuario.telefono);
    this.crearUsuarioForm.rol.setValue(this.usuario.rol);
    this.crearUsuarioForm.direccion.setValue(this.usuario.direccion);
  }

  onSubmit() {
    this.dialogRef.close(this.usuariosForm.value);
  }

  clean() {
    this.usuariosForm.reset();
  }

  get crearUsuarioForm() {
    return this.usuariosForm.controls;
  }
}
