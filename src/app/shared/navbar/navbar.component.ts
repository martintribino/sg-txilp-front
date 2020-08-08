import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { IJWT } from 'src/app/interface/interface.model';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl'],
})
export class NavbarComponent implements OnInit {
  @Output() openSidebar = new EventEmitter<boolean>();
  urlMap: Map<string, string> = new Map();

  constructor(private authService: AuthenticationService) {
    this.urlMap = new Map();
    this.urlMap.set('home', 'Inicio');
  }

  ngOnInit(): void {
    this.authService.usuario.subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error)
    );
  }

  onSuccess(result: IJWT) {
    this.urlMap = new Map();
    this.urlMap.set('home', 'Inicio');
    if (result == null) {
      this.urlMap.set('iniciar-sesion', 'Iniciar Sesión');
    } else {
      this.urlMap.set('perfil', 'Perfil');
      this.urlMap.set('cerrar-sesion', 'Cerrar Sesión');
    }
  }

  onError(error) {
    this.authService.logout();
    this.urlMap = new Map();
    this.urlMap.set('home', 'Inicio');
    this.urlMap.set('iniciar-sesion', 'Iniciar Sesión');
  }

  toggleSidebar(): void {
    this.openSidebar.emit();
  }

  originalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };
}
