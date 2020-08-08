import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RolGuard implements CanLoad {
  constructor(public auth: AuthenticationService, public router: Router) {}
  canLoad(
    route: Route,
    segments: import('@angular/router').UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    let allowedRoles: string[] = route.data.allowedRoles,
      usu = this.auth.getUsuario();
    if (this.auth.isLoggedIn && usu != null) {
      if (allowedRoles.includes(usu.rol)) {
        return true;
      } else {
        this.router.navigate(['not-allowed']);
        return false;
      }
    } else {
      this.router.navigate(['iniciar-sesion']);
      return false;
    }
  }
}
