import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EspaciosComponent } from './espacios.component';
import { RolGuard } from 'src/app/auth/rol.guard';
import { RolTipo } from 'src/app/interface/interface.model';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EspaciosComponent,
        pathMatch: 'full',
      },
      {
        path: ':id',
        loadChildren: () =>
          import('../../pages/espacio/espacio.module').then(
            (mod) => mod.EspacioModule
          ),
        pathMatch: 'full',
        canLoad: [RolGuard],
        data: {
          allowedRoles: [RolTipo.Administrador, RolTipo.Participante],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspaciosRoutingModule {}
