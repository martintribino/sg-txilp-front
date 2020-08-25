import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IEtiqueta } from '../interface/interface.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EtiquetaService {
  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getEtiquetas(): Observable<Array<IEtiqueta>> {
    let url = this.endpoints.etiquetas,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IEtiqueta>>(url, options);
  }

  getEtiqueta(id: number): Observable<IEtiqueta> {
    let url = `${this.endpoints.etiquetas}${id}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<IEtiqueta>(url, options);
  }

  crearEtiqueta(etiqueta: IEtiqueta): Observable<IEtiqueta> {
    let url = this.endpoints.etiquetas,
      options = {
        headers: this.headers,
      };
    return this.http.post<IEtiqueta>(url, etiqueta, options);
  }

  actualizarEtiqueta(etiqueta: IEtiqueta): Observable<Array<IEtiqueta>> {
    let url = this.endpoints.etiquetas,
      options = {
        headers: this.headers,
      };
    return this.http.put<Array<IEtiqueta>>(url, etiqueta, options);
  }

  eliminarEtiqueta(etiqueta: IEtiqueta): Observable<IEtiqueta> {
    let url = `${this.endpoints.etiquetas}${etiqueta.nombre}`,
      options = {
        headers: this.headers,
      };
    return this.http.delete<IEtiqueta>(url, options);
  }
}
