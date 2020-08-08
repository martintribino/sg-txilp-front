import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { IniciarSesionComponent } from './iniciar-sesion.component';

const routes: Routes = [
  {
    path: '',
    component: IniciarSesionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciarSesionRoutingModule {}
