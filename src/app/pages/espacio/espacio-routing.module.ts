import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EspacioComponent } from './espacio.component';

const routes: Routes = [
  {
    path: '',
    component: EspacioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspacioRoutingModule {}
