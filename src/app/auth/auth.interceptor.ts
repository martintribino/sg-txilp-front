import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwtoken = JSON.parse(localStorage.getItem('jwtuser'));
    if (jwtoken && jwtoken.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtoken.token}`,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          //errores de token - 403
          this.authService.logout();
          this.router.navigate(['/iniciar-sesion'], { queryParams: {} });
        }
        return throwError(error);
      })
    );
  }
}
