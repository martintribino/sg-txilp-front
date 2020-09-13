import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UsuariosComponent } from './usuarios.component';
import { RolGuard } from 'src/app/auth/rol.guard';
import { RolTipo } from 'src/app/interface/interface.model';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UsuariosComponent,
        pathMatch: 'full',
      },
      {
        path: ':id',
        loadChildren: () =>
          import('../../pages/usuario/usuario.module').then(
            (mod) => mod.UsuarioModule
          ),
        pathMatch: 'full',
        canLoad: [RolGuard],
        data: {
          allowedRoles: [RolTipo.Administrador],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
