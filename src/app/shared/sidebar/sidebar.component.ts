import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { AuthenticationService } from 'src/app/services/auth.service';
import { IJWT } from 'src/app/interface/interface.model';
import { Router } from '@angular/router';
import { isArray } from 'util';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.styl'],
})
export class SidebarComponent implements OnInit {
  @Input() open: boolean = true;
  public isHandset: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));
  urlFixedMap: Map<string, string> = new Map(); //fijas
  urlMap: Map<string, string> = new Map();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService,
    private router: Router
  ) {
    //urls habilitadas
    this.urlMap = new Map();
    this.urlFixedMap = new Map();
    this.urlFixedMap.set('home', 'Inicio');
  }

  ngOnInit(): void {
    this.authService.usuario.subscribe(
      (data) => this.onSuccess(data),
      (error) => this.onError(error)
    );
  }

  onSuccess(result: IJWT) {
    this.urlMap = new Map();
    this.urlFixedMap = new Map();
    this.urlFixedMap.set('home', 'Inicio');
    if (result == null) {
      this.urlFixedMap.set('iniciar-sesion', 'Iniciar Sesión');
    } else {
      this.router.config.map((elem) => {
        if (
          elem.data &&
          elem.data.allowedRoles &&
          isArray(elem.data.allowedRoles) &&
          elem.data.allowedRoles.includes(result.rol)
        )
          this.urlMap.set(
            elem.path,
            elem.path[0].toUpperCase() + elem.path.substr(1).toLowerCase()
          );
      });
      this.urlFixedMap.set('cerrar-sesion', 'Cerrar Sesión');
    }
  }

  onError(error) {
    this.authService.logout();
    this.urlMap = new Map();
    this.urlFixedMap = new Map();
    this.urlFixedMap.set('home', 'Inicio');
    this.urlFixedMap.set('iniciar-sesion', 'Iniciar Sesión');
  }

  originalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };
}
