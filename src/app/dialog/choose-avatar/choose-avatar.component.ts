import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import {
  AvatarTipo,
  IDialogBody,
  IUsuario,
} from 'src/app/interface/interface.model';

@Component({
  selector: 'app-choose-avatar',
  templateUrl: './choose-avatar.component.html',
  styleUrls: ['./choose-avatar.component.styl'],
})
export class ChooseAvatarComponent {
  imagenSeleccionada: string = 'noavatar';
  avatars: Array<string>;
  isSubmiting: boolean = false;
  usuario: IUsuario = null;

  constructor(
    public dialogRef: MatDialogRef<ChooseAvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public body: IUsuario
  ) {
    this.isSubmiting = false;
    this.avatars = Object.keys(AvatarTipo);
    this.usuario = body;
    this.imagenSeleccionada =
      this.usuario != null && this.avatars.includes(this.usuario.avatar)
        ? this.usuario.avatar
        : 'noavatar';
  }

  onSubmit() {
    this.usuario.avatar = this.imagenSeleccionada;
    this.dialogRef.close(this.usuario);
  }

  onChange(event: MatRadioChange) {
    if (event != null && event.value != null)
      this.imagenSeleccionada = event.value;
  }

  isDisabled(): boolean {
    return (
      this.imagenSeleccionada == null ||
      this.imagenSeleccionada == 'noavatar' ||
      this.usuario == null ||
      this.imagenSeleccionada == this.usuario.avatar
    );
  }
}
