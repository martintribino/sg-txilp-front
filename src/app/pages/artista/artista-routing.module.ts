import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ArtistaComponent } from '../artista/artista.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistaRoutingModule {}
