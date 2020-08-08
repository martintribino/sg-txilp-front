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
    let url = this.endpoints.usuarios,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IArtista>>(url, options);
  }

  getArtista(): Observable<Array<IArtista>> {
    let url = this.endpoints.usuarios,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IArtista>>(url, options);
  }
}
