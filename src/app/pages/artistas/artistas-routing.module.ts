import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ArtistasComponent } from './artistas.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistasRoutingModule {}
