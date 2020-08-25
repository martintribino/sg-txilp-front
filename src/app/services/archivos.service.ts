import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { IImagen } from "../interface/interface.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ArchivosService {
  endpoints = environment.endpoints;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set("Content-Type", "multipart/form-data");
  }

  cargarImagen(path: string): Observable<IImagen> {
    let url = `${this.endpoints.archivos}${path}/`,
      options = {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
      };
    return this.http.get<IImagen>(url, options);
  }

  guardarImagen(form: FormData, path: string) {
    let url = `${this.endpoints.archivos}${path}`,
      options = {
        //headers: this.headers,
      };
    return this.http.post(url, form, options);
  }
}
