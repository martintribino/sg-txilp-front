import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import {
  ILoginBody,
  MSGTIME,
  IUsuario,
  IJWT,
} from 'src/app/interface/interface.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar/snack-bar-config';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.styl'],
})
export class IniciarSesionComponent implements OnInit {
  loginForm = new FormGroup({
    nombreUsuario: new FormControl(''),
    clave: new FormControl(''),
  });
  redirecting: boolean;
  isSubmiting: boolean;
  hide: boolean = true;

  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.isSubmiting = false;
    this.hide = true;
    this.loginForm = new FormGroup({
      nombreUsuario: new FormControl(''),
      clave: new FormControl(''),
    });
    this.redirecting = false;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.isSubmiting = true;
    this.hide = true;
    this.redirecting = false;
    let loginBody: ILoginBody = {
      nombreUsuario: this.loginF.nombreUsuario.value,
      clave: this.loginF.clave.value,
    };
    this.authService.login(loginBody).subscribe(
      (data: IJWT) => this.onSuccess(data),
      (error: HttpErrorResponse) => this.handleError(error),
      () => this.handleCompleted()
    );
  }

  onSuccess(result: IJWT) {
    this.mostrarMensaje('Autenticación correcta. Redirigiendo...', 'success');
    this.redirecting = true;
    this.authService.isLoggedIn.subscribe(
      () => {
        this.router.navigate(['/'], { queryParams: {} });
      },
      () => {
        this.revert();
        this.redirecting = false;
      }
    );
    this.authService.setSession(result);
    this.authService.setUsuarioByToken();
  }

  handleError(error: HttpErrorResponse) {
    this.mostrarMensaje(
      'Datos incorrectos. Por favor, intente nuevamente',
      'error'
    );
    this.isSubmiting = false;
    this.loginF.clave.reset();
  }

  handleCompleted() {
    this.isSubmiting = false;
    this.redirecting = false;
  }

  revert() {
    this.loginForm.reset();
  }

  get loginF() {
    return this.loginForm.controls;
  }

  visibilityClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.hide = !this.hide;
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
