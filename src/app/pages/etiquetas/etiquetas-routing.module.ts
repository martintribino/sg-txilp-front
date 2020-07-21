import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { EtiquetasComponent } from './etiquetas.component';

const routes: Routes = [
  {
    path: '',
    component: EtiquetasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtiquetasRoutingModule {}
