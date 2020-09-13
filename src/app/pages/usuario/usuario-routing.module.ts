import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
