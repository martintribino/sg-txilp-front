import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.styl'],
})
export class SidebarComponent implements OnInit {
  @Input() open: boolean = true;
  public isHandset: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));
  urlMap: Map<string, string> = new Map();

  constructor(private breakpointObserver: BreakpointObserver) {
    //urls habilitadas
    this.urlMap.set('home', 'Inicio');
    this.urlMap.set('actividades', 'Actividades');
    this.urlMap.set('artistas', 'Artistas');
    this.urlMap.set('ediciones', 'Ediciones');
    this.urlMap.set('espacios', 'Espacios');
    this.urlMap.set('etiquetas', 'Etiquetas');
    this.urlMap.set('obras', 'Obras');
    this.urlMap.set('usuarios', 'Usuarios');
  }

  ngOnInit(): void {}
}
