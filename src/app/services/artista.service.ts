import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IArtista } from '../interface/interface.model';
//import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ArtistaService {
  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  getArtistas(): Observable<Array<IArtista>> {
    let url = this.endpoints.artistas,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IArtista>>(url, options);
  }

  getArtista(id: number): Observable<IArtista> {
    let url = `${this.endpoints.artistas}${id}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<IArtista>(url, options);
  }

  crearArtista(artista: IArtista): Observable<Array<IArtista>> {
    let url = this.endpoints.artistas,
      options = {
        headers: this.headers,
      };
    return this.http.post<Array<IArtista>>(url, artista, options);
  }

  actualizarArtista(artista: IArtista): Observable<Array<IArtista>> {
    let url = this.endpoints.artistas,
      options = {
        headers: this.headers,
      };
    return this.http.put<Array<IArtista>>(url, artista, options);
  }

  agregarEtiqueta(
    nombre: string,
    artista: IArtista
  ): Observable<Array<IArtista>> {
    let url = `${this.endpoints.artistas}etiqueta/${nombre}`,
      options = {
        headers: this.headers,
      };
    return this.http.put<Array<IArtista>>(url, artista, options);
  }

  eliminarArtista(artista: IArtista): Observable<Array<IArtista>> {
    let url = `${this.endpoints.artistas}${artista.id}`,
      options = {
        headers: this.headers,
      };
    return this.http.delete<Array<IArtista>>(url, options);
  }
}
