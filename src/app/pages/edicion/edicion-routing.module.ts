import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EdicionComponent } from './edicion.component';

const routes: Routes = [
  {
    path: '',
    component: EdicionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdicionRoutingModule {}
