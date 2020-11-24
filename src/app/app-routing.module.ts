import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { RolGuard } from './auth/rol.guard';
import { RolTipo } from './interface/interface.model';

const routes: Routes = [
  {
    path: 'actividades',
    loadChildren: () =>
      import('./pages/actividades/actividades.module').then(
        (mod) => mod.ActividadesModule
      ),
    canLoad: [RolGuard],
    data: {
      allowedRoles: [RolTipo.Administrador, RolTipo.Operador],
    },
  },
  {
    path: 'artistas',
    loadChildren: () =>
      import('./pages/artistas/artistas.module').then(
        (mod) => mod.ArtistasModule
      ),
    canLoad: [RolGuard],
    data: {
      allowedRoles: [RolTipo.Administrador],
    },
  },
  {
    path: 'ediciones',
    loadChildren: () =>
      import('./pages/ediciones/ediciones.module').then(
        (mod) => mod.EdicionesModule
      ),
    canLoad: [RolGuard],
    data: {
      allowedRoles: [RolTipo.Administrador],
    },
  },
  {
    path: 'espacios',
    loadChildren: () =>
      import('./pages/espacios/espacios.module').then(
        (mod) => mod.EspaciosModule
      ),
    canLoad: [RolGuard],
    data: {
      allowedRoles: [RolTipo.Administrador],
    },
  },
  {
    path: 'etiquetas',
    loadChildren: () =>
      import('./pages/etiquetas/etiquetas.module').then(
        (mod) => mod.EtiquetasModule
      ),
    canLoad: [RolGuard],
    data: {
      allowedRoles: [RolTipo.Administrador, RolTipo.Participante],
    },
  },
  {
    path: 'obras',
    loadChildren: () =>
      import('./pages/obras/obras.module').then((mod) => mod.ObrasModule),
    canLoad: [RolGuard],
    data: {
      allowedRoles: [RolTipo.Administrador],
    },
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./pages/usuarios/usuarios.module').then(
        (mod) => mod.UsuariosModule
      ),
    canLoad: [RolGuard],
    data: {
      allowedRoles: [RolTipo.Administrador],
    },
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./pages/perfil/perfil.module').then((mod) => mod.PerfilModule),
    canLoad: [RolGuard],
    data: {
      allowedRoles: [
        RolTipo.Administrador,
        RolTipo.Operador,
        RolTipo.Participante,
        RolTipo.Visitante,
      ],
    },
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () =>
      import('./pages/iniciar-sesion/iniciar-sesion.module').then(
        (mod) => mod.IniciarSesionModule
      ),
  },
  {
    path: 'cerrar-sesion',
    loadChildren: () =>
      import('./pages/cerrar-sesion/cerrar-sesion.module').then(
        (mod) => mod.CerrarSesionModule
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
