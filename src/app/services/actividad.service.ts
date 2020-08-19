import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { IActividad } from "../interface/interface.model";

@Injectable({
  providedIn: "root",
})
export class ActividadService {
  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set("Content-Type", "application/json");
  }

  getActividades(): Observable<Array<IActividad>> {
    let url = this.endpoints.actividades,
      options = {
        headers: this.headers,
      };
    return this.http.get<Array<IActividad>>(url, options);
  }

  getActividad(id: number): Observable<IActividad> {
    let url = `${this.endpoints.actividades}${id}`,
      options = {
        headers: this.headers,
      };
    return this.http.get<IActividad>(url, options);
  }

  crearActividad(actividad: IActividad): Observable<Array<IActividad>> {
    let url = this.endpoints.actividades,
      options = {
        headers: this.headers,
      };
    return this.http.post<Array<IActividad>>(url, actividad, options);
  }

  actualizarActividad(actividad: IActividad): Observable<Array<IActividad>> {
    let url = this.endpoints.actividades,
      options = {
        headers: this.headers,
      };
    return this.http.put<Array<IActividad>>(url, actividad, options);
  }

  eliminarActividad(actividad: IActividad): Observable<Array<IActividad>> {
    let url = `${this.endpoints.actividades}${actividad.id}`,
      options = {
        headers: this.headers,
      };
    return this.http.delete<Array<IActividad>>(url, options);
  }
}
