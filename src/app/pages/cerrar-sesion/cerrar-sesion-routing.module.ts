import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CerrarSesionComponent } from './cerrar-sesion.component';

const routes: Routes = [
  {
    path: '',
    component: CerrarSesionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CerrarSesionRoutingModule {}
