import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IEdicion } from '../interface/interface.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EdicionService {
  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getEdiciones(): Observable<Array<IEdicion>> {
    let url = this.endpoints.ediciones,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IEdicion>>(url, options);
  }

  getEdicion(id: number): Observable<IEdicion> {
    let url = `${this.endpoints.ediciones}${id}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<IEdicion>(url, options);
  }

  crearEdicion(edicion: IEdicion): Observable<Array<IEdicion>> {
    let url = this.endpoints.ediciones,
      options = {
        headers: this.headers,
      };
    return this.http.post<Array<IEdicion>>(url, edicion, options);
  }

  actualizarEdicion(edicion: IEdicion): Observable<Array<IEdicion>> {
    let url = this.endpoints.ediciones,
      options = {
        headers: this.headers,
      };
    return this.http.put<Array<IEdicion>>(url, edicion, options);
  }

  eliminarEdicion(edicion: IEdicion): Observable<Array<IEdicion>> {
    let url = `${this.endpoints.ediciones}${edicion.id}`,
      options = {
        headers: this.headers,
      };
    return this.http.delete<Array<IEdicion>>(url, options);
  }
}
