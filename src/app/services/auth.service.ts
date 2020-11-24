import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IUsuario, ILoginBody, IJWT } from '../interface/interface.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private endpoints = environment.endpoints;
  private usuarioSubject = new BehaviorSubject<IJWT>(null);
  public usuario = this.usuarioSubject.asObservable();
  private authSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn = this.authSubject.asObservable();
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.unsetUsuario();
    this.updateLoggedInState(false);
    this.setUsuarioByToken();
  }

  setUsuarioByToken() {
    let usu: IJWT,
      jwtoken = JSON.parse(localStorage.getItem('jwtuser'));
    try {
      usu = {
        id: jwtoken.id,
        nombreUsuario: jwtoken.nombreUsuario,
        rol: jwtoken.rol,
        avatar: jwtoken.avatar,
        token: jwtoken.token,
      };
      this.updateLoggedInState(true);
      this.setUsuario(usu);
    } catch (error) {
      usu = null;
      this.updateLoggedInState(false);
      this.unsetUsuario();
    }
  }

  setUsuario(usu: IJWT) {
    this.usuarioSubject.next(usu);
  }

  getUsuario(): IJWT {
    return this.usuarioSubject.getValue();
  }

  unsetUsuario() {
    this.usuarioSubject.next(null);
  }

  setSession(authResult: IJWT) {
    if (authResult == null) return;
    let jwtokenHeader = authResult.token;
    if (jwtokenHeader == undefined) return;
    this.updateLoggedInState(true);
    localStorage.setItem('jwtuser', JSON.stringify(authResult));
    this.setUsuario(authResult);
    console.log('--- Set Session ---');
  }

  logout() {
    localStorage.removeItem('jwtuser');
    this.updateLoggedInState(false);
    this.unsetUsuario();
    console.log('--- Log out ---');
  }

  updateLoggedInState(status: boolean) {
    this.authSubject.next(status);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn;
  }

  login(body: ILoginBody): Observable<IJWT> {
    let url: string = this.endpoints.login,
      options = {
        headers: this.headers,
      };
    return this.http.post<IJWT>(url, body, options);
  }
}
