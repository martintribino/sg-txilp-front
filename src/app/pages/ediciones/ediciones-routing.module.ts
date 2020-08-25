import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EdicionesComponent } from './ediciones.component';
import { RolGuard } from 'src/app/auth/rol.guard';
import { RolTipo } from 'src/app/interface/interface.model';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EdicionesComponent,
        pathMatch: 'full',
      },
      {
        path: ':id',
        loadChildren: () =>
          import('../../pages/edicion/edicion.module').then(
            (mod) => mod.EdicionModule
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
export class EdicionesRoutingModule {}
