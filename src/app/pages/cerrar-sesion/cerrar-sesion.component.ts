import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.styl'],
})
export class CerrarSesionComponent implements OnInit {
  constructor(private authService: AuthenticationService) {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
