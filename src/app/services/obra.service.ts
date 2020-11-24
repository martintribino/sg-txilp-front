import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IObra } from '../interface/interface.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObraService {
  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getObras(): Observable<Array<IObra>> {
    let url = this.endpoints.obras,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IObra>>(url, options);
  }

  getObrasPorArtista(id: number): Observable<Array<IObra>> {
    let url = `${this.endpoints.obras}artista/${id}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IObra>>(url, options);
  }

  getObra(id: number): Observable<IObra> {
    let url = `${this.endpoints.obras}${id}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<IObra>(url, options);
  }

  crearObra(obra: IObra): Observable<Array<IObra>> {
    let url = this.endpoints.obras,
      options = {
        headers: this.headers,
      };
    return this.http.post<Array<IObra>>(url, obra, options);
  }

  actualizarObra(obra: IObra): Observable<Array<IObra>> {
    let url = this.endpoints.obras,
      options = {
        headers: this.headers,
      };
    return this.http.put<Array<IObra>>(url, obra, options);
  }

  toggleObraFav(obra: IObra): Observable<Array<IObra>> {
    let url = `${this.endpoints.obras}${obra.id}/meinteresa`,
      options = {
        headers: this.headers,
      };
    return this.http.put<Array<IObra>>(url, obra, options);
  }

  agregarEtiqueta(nombre: string, obra: IObra): Observable<Array<IObra>> {
    let url = `${this.endpoints.obras}etiqueta/${nombre}`,
      options = {
        headers: this.headers,
      };
    return this.http.put<Array<IObra>>(url, obra, options);
  }

  eliminarObra(obra: IObra): Observable<Array<IObra>> {
    let url = `${this.endpoints.obras}${obra.id}`,
      options = {
        headers: this.headers,
      };
    return this.http.delete<Array<IObra>>(url, options);
  }
}
