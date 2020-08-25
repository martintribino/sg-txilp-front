import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ActividadesComponent } from './actividades.component';
import { RolGuard } from 'src/app/auth/rol.guard';
import { RolTipo } from 'src/app/interface/interface.model';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ActividadesComponent,
        pathMatch: 'full',
      },
      {
        path: ':id',
        loadChildren: () =>
          import('../../pages/actividad/actividad.module').then(
            (mod) => mod.ActividadModule
          ),
        pathMatch: 'full',
        canLoad: [RolGuard],
        data: {
          allowedRoles: [RolTipo.Administrador, RolTipo.Operador],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadesRoutingModule {}
