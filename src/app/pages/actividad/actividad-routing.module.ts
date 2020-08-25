import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ActividadComponent } from './actividad.component';

const routes: Routes = [
  {
    path: '',
    component: ActividadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadRoutingModule {}
