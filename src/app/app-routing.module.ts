import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';

const routes: Routes = [
  {
    path: 'actividades',
    loadChildren: () =>
      import('./pages/actividades/actividades.module').then(
        (mod) => mod.ActividadesModule
      ),
  },
  {
    path: 'artistas',
    loadChildren: () =>
      import('./pages/artistas/artistas.module').then(
        (mod) => mod.ArtistasModule
      ),
  },
  {
    path: 'ediciones',
    loadChildren: () =>
      import('./pages/ediciones/ediciones.module').then(
        (mod) => mod.EdicionesModule
      ),
  },
  {
    path: 'espacios',
    loadChildren: () =>
      import('./pages/espacios/espacios.module').then(
        (mod) => mod.EspaciosModule
      ),
  },
  {
    path: 'etiquetas',
    loadChildren: () =>
      import('./pages/etiquetas/etiquetas.module').then(
        (mod) => mod.EtiquetasModule
      ),
  },
  {
    path: 'obras',
    loadChildren: () =>
      import('./pages/obras/obras.module').then((mod) => mod.ObrasModule),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./pages/usuarios/usuarios.module').then(
        (mod) => mod.UsuariosModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((mod) => mod.HomeModule),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'not-allowed', component: NotAllowedComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
