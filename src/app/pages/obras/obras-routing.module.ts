import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ObrasComponent } from './obras.component';
import { RolGuard } from 'src/app/auth/rol.guard';
import { RolTipo } from 'src/app/interface/interface.model';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ObrasComponent,
        pathMatch: 'full',
      },
      {
        path: ':id',
        loadChildren: () =>
          import('../../pages/obra/obra.module').then((mod) => mod.ObraModule),
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
export class ObrasRoutingModule {}
