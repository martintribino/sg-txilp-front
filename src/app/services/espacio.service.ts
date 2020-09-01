import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEspacio } from '../interface/interface.model';

@Injectable({
  providedIn: 'root',
})
export class EspacioService {
  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getEspacios(): Observable<Array<IEspacio>> {
    let url = this.endpoints.espacios,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IEspacio>>(url, options);
  }

  getEspacio(id: number): Observable<IEspacio> {
    let url = `${this.endpoints.espacios}${id}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<IEspacio>(url, options);
  }

  crearEspacio(espacio: IEspacio): Observable<Array<IEspacio>> {
    let url = this.endpoints.espacios,
      options = {
        headers: this.headers,
      };
    return this.http.post<Array<IEspacio>>(url, espacio, options);
  }

  actualizarEspacio(espacio: IEspacio): Observable<Array<IEspacio>> {
    let url = this.endpoints.espacios,
      options = {
        headers: this.headers,
      };
    return this.http.put<Array<IEspacio>>(url, espacio, options);
  }

  agregarEtiqueta(
    nombre: string,
    espacio: IEspacio
  ): Observable<Array<IEspacio>> {
    let url = `${this.endpoints.espacios}etiqueta/${nombre}`,
      options = {
        headers: this.headers,
      };
    return this.http.put<Array<IEspacio>>(url, espacio, options);
  }

  eliminarEspacio(espacio: IEspacio): Observable<Array<IEspacio>> {
    let url = `${this.endpoints.espacios}${espacio.id}`,
      options = {
        headers: this.headers,
      };
    return this.http.delete<Array<IEspacio>>(url, options);
  }
}
