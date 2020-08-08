import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PerfilComponent } from './perfil.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilRoutingModule {}
