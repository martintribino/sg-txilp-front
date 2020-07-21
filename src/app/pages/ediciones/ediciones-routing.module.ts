import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EdicionesComponent } from './ediciones.component';

const routes: Routes = [
  {
    path: '',
    component: EdicionesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdicionesRoutingModule {}
