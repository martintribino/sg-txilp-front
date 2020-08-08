import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario } from '../interface/interface.model';
import { environment } from 'src/environments/environment';
//import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getUsuarios(): Observable<Array<IUsuario>> {
    let url = this.endpoints.usuarios,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IUsuario>>(url, options);
  }

  getUsuario(username: string): Observable<IUsuario> {
    let url = `${this.endpoints.usuarios}${username}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<IUsuario>(url, options);
  }

  crearUsuario(usuario: IUsuario): Observable<Array<IUsuario>> {
    let url = this.endpoints.usuarios,
      options = {
        headers: this.headers,
      };
    return this.http.post<Array<IUsuario>>(url, usuario, options);
  }

  actualizarUsuario(usuario: IUsuario): Observable<Array<IUsuario>> {
    let url = this.endpoints.usuarios,
      options = {
        headers: this.headers,
      };
    return this.http.put<Array<IUsuario>>(url, usuario, options);
  }

  eliminarUsuario(usuario: IUsuario): Observable<Array<IUsuario>> {
    let url = `${this.endpoints.usuarios}${usuario.nombreUsuario}`,
      options = {
        headers: this.headers,
      };
    return this.http.delete<Array<IUsuario>>(url, options);
  }
}
